import pandas as pd
import sqlite3
import os
import pdb
import argparse


parser = argparse.ArgumentParser()
parser.add_argument("--relation", default="i", type=str)
parser.add_argument("--tags", default="", type=str)
parser.add_argument("--exclude_tags", default="", type=str)
parser.add_argument("--exclude_refs", default="", type=str)
flags = parser.parse_args()

db_path = os.path.join(os.path.expanduser("~"), ".emacs.d", "org-roam.db")
con = sqlite3.connect(db_path)
cur = con.cursor()

# move 'result' tag
delete_state = """delete from tags where tag ='"result"' """
cur.execute(delete_state)
con.commit()

# exclude
exclude_set = set()
exclude_tags = flags.exclude_tags.split(",")
for tag in exclude_tags:
    if len(tag) < 1:
        continue
    result = pd.read_sql(f"""select node_id from tags where tag = '"{tag}"' """, con)
    exclude_set.union(set(result['node_id']))
exclude_refs = flags.exclude_refs.split(",")
for ref in exclude_refs:
    if len(ref) < 1:
        continue
    result = pd.read_sql(f"""select node_id from refs where ref = '"{ref}"' """, con)
    exclude_set.union(set(result['node_id']))

sets_all = []
tags = flags.tags.split(",")
for tag in tags:
    result = pd.read_sql(f"""select node_id from tags where tag = '"{tag}"' """, con)
    sets_all.append(set(result['node_id'].values))

filter_ids = set()
if flags.relation == "i":
    filter_ids = set.intersection(*sets_all)
elif flags.relation == "u":
    filter_ids = set.union(*sets_all)

# remove excluded
filter_ids = filter_ids - exclude_set
for node_id in filter_ids:
    cur.execute(f"""insert into tags values ('{node_id}', '"result"')""")
print(f"{flags.relation}, result number: {len(filter_ids)}")

con.commit()
con.close()
