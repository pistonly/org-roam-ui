import { useState, useEffect, useRef } from 'react'
import {
  Button,
  Slide,
  VStack,
  Flex,
  Heading,
  Box,
  CloseButton,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  IconButton,
} from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export interface SideBarProps {
  isOpen: boolean
  onClose: any
  openNode: string
  nodeById: any
}

export const Sidebar = (props: SideBarProps) => {
  const { isOpen, onClose, openNode, nodeById } = props
  const [nodeHTML, setNodeHTML] = useState<any>()

  const getHTMLNode = () => {
    return fetch('http://localhost:35901/id/' + openNode)
      .then((res) => res.text())
      .then((htmlResponse: any) => {
        setNodeHTML({ __html: htmlResponse })
      })
      .catch((e) => {
        setNodeHTML({
          __html: 'Whoops something did not go right here, check the console for more details.',
        })
      })
  }
  const titleRef = useRef()

  useEffect(() => {
    if (!openNode) {
      return
    }
    if (openNode === 'nil') {
      return
    }
    titleRef.current = nodeById[openNode]?.title ?? ' '
    getHTMLNode()
  }, [openNode])

  //maybe want to close it when clicking outside, but not sure
  //const outsideClickRef = useRef();

  return (
    <Slide direction="right" in={isOpen} style={{ zIndex: 200, width: 500 }} unmountOnExit>
      <Flex flexDirection="row" height="100%">
        <IconButton
          icon={<ChevronRightIcon height={30} />}
          colorScheme="white"
          aria-label="Close file-viewer"
          height={100}
          variant="outline"
          marginRight={-2}
          bg="alt.100"
          onClick={onClose}
          marginTop={20}
        />
        <Box
          color="gray.800"
          bg="alt.100"
          boxShadow="xl"
          w={500}
          height="98%"
          position="relative"
          zIndex="overlay"
          marginTop={10}
          paddingBottom={15}
          borderRadius="xl"
          right={-2}
        >
          <Flex
            justifyContent="space-between"
            padding={4}
            paddingTop={10}
            paddingLeft={10}
            width="80%"
            alignItems="center"
            color="black"
          >
            <Heading size="md">{titleRef.current}</Heading>
          </Flex>
          <Scrollbars
            //autoHeight
            //autoHeightMax={600}
            autoHide
            renderThumbVertical={({ style, ...props }) => (
              <Box
                {...props}
                style={{
                  ...style,
                  borderRadius: 10,
                }}
                bg="purple.500"
              />
            )}
          >
            <VStack alignItems="left" bg="alt.100" paddingLeft={10} paddingRight={10}>
              <Box
                className="org"
                sx={{
                  h1: { display: 'none' },
                  h2: {
                    fontSize: '20',
                    fontWeight: 'bold !important',
                    marginBottom: '1em',
                    color: 'black',
                  },
                  h3: {
                    fontSize: '18',
                    fontWeight: '600 !important',
                    marginBottom: '.5em',
                  },
                  h4: {
                    fontSize: '16',
                    fontWeight: '500 !important',
                    marginBottom: '.25em',
                    fontStyle: 'italic',
                  },
                  a: {
                    color: 'purple.500',
                    pointerEvents: 'none',
                  },
                  ol: {
                    paddingLeft: '5',
                  },
                  ul: {
                    paddingLeft: '5',
                  },
                  p: {
                    paddingBottom: '.5em',
                  },
                  '#content': { textAlign: 'justify' },
                  '.title': {
                    textAlign: 'center',
                    marginBottom: '.2em',
                  },
                  '.subtitle': {
                    textAlign: 'center',
                    fontSize: 'medium',
                    fontWeight: 'bold',
                    marginTop: 0,
                  },
                  '.todo': { fontFamily: 'monospace', color: 'red' },
                  '.equationContainer': {
                    display: 'table',
                    textAlign: 'center',
                    width: '100%',
                  },
                  '.equation': {
                    verticalAlign: 'middle',
                  },
                  '.equation-label': {
                    display: 'tableCell',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  },
                  '.inlinetask': {
                    padding: '10px',
                    border: '2px solid gray',
                    margin: '10px',
                    background: '#ffffcc',
                  },
                  '#org-div-home-and-up': {
                    textAlign: 'right',
                    fontSize: '70 % ',
                    whiteSpace: 'nowrap',
                  },
                  textarea: { overflowX: 'auto' },
                  '.linenr': { fontSize: 'smaller' },
                  '.code-highlighted': { backgroundColor: '#ffff00' },
                  '.org-info-js_info-navigation': { borderStyle: 'none' },
                  '#org-info-js_console-label': {
                    fontSize: '10px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  },
                  '.org-info-js_search-highlight': {
                    backgroundColor: '#ffff00',
                    color: '#000000',
                    fontWeight: 'bold',
                  },
                  '.org-svg': { width: '90%' },
                  '.done': { fontFamily: 'monospace', color: 'green' },
                  '.priority': { fontFamily: 'monospace', color: 'orange' },
                  '.tag': {
                    backgroundColor: '#eee',
                    fontFamily: 'monospace',
                    padding: '2px',
                    fontSize: '80%',
                    fontWeight: 'normal',
                  },
                  '.timestamp': { color: '#bebebe' },
                  '.timestamp-kwd': { color: '#5f9ea0' },
                  '.org-right': { marginLeft: 'auto', marginRight: '0px', textAlign: 'right' },
                  '.org-left': { marginLeft: '0px', marginRight: 'auto', textAlign: 'left' },
                  '.org-center': { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' },
                  '.underline': { textDecoration: 'underline' },
                  '#postamble p': { fontSize: '90%', margin: '.2em' },
                  '#preamble p': { fontSize: '90%', margin: '.2em' },
                  'p.verse': { marginLeft: '3%' },
                  pre: {
                    border: '1px solid #e6e6e6',
                    borderRadius: '3px',
                    backgroundColor: '#f2f2f2',
                    padding: '8pt',
                    fontFamily: 'monospace',
                    overflow: 'auto',
                    margin: '1.2em',
                  },
                  'pre.src': {
                    position: 'relative',
                    overflow: 'auto',
                  },
                  'pre.src:before': {
                    display: 'none',
                    position: 'absolute',
                    top: '-8px',
                    right: '12px',
                    padding: '3px',
                    color: '#555',
                    backgroundColor: '#f2f2f299',
                  },
                  'caption.t-above': { captionSide: 'top' },
                  'caption.t-bottom': { captionSide: 'bottom' },
                  'th.org-right': { textAlign: 'center' },
                  'th.org-left': { textAlign: 'center' },
                  'th.org-center': { textAlign: 'center' },
                  'td.org-right': { textAlign: 'right' },
                  'td.org-left': { textAlign: 'left' },
                  'td.org-center': { textAlign: 'center' },
                  '.footpara': { display: 'inline' },
                  '.footdef': { marginBottom: '1em' },
                  '.figure': { padding: '1em' },
                  '.figure p': { textAlign: 'center' },
                }}
                dangerouslySetInnerHTML={nodeHTML}
              />
            </VStack>
          </Scrollbars>
        </Box>
      </Flex>
    </Slide>
  )
}

/* <"Drawer": position="absolute" onClose={onClose}, "isOpen=":{isOpen}, "motionPreset="slideInBottom"": size="md">
        <DrawerContent bg="alt.100">
            <DrawerCloseButton />
            <DrawerHeader>{nodeById[emacsNodeId]?.title!}, </"DrawerHeader>
":            <DrawerBody>
                <div className={styles.org}, "dangerouslySetInnerHTML=":{nodeHTML}, />
            </"DrawerBody>

":        </DrawerContent>
    </Drawer >

                                "pre.src:hover:before": { display: "inline", marginTop: "14px", },
                                "pre.src - asymptote:before": { content: 'Asymptote' },
                                "pre.src-awk:before": { content: 'Awk' },
                                "pre.src-authinfo::before": { content: 'Authinfo' },
                                "pre.src-C:before": { content: 'C' },
                                "pre.src - clojure:before": { content: 'Clojure' },
                                "pre.src-css:before": { content: 'CSS' },
                                "pre.src-D:before": { content: 'D' },
                                "pre.src-ditaa:before": { content: 'ditaa' },
                                "pre.src-dot:before": { content: 'Graphviz' },
                                "pre.src-calc:before": { content: 'Emacs Calc' },
                                "pre.src-emacs-lisp:before": { content: 'Emacs Lisp' },
                                "pre.src-fortran:before": { content: 'Fortran' },
                                "pre.src-gnuplot:before": { content: 'gnuplot' },
                                "pre.src-haskell:before": { content: 'Haskell' },
                                "pre.src-hledger:before": { content: 'hledger' },
                                "pre.src-java:before": { content: 'Java' },
                                "pre.src-js:before": { content: 'Javascript' },
                                "pre.src-latex:before": { content: 'LaTeX' },
                                "pre.src-ledger:before": { content: 'Ledger' },
                                "pre.src-lisp:before": { content: 'Lisp' },
                                "pre.src-lilypond:before": { content: 'Lilypond' },
                                "pre.src-lua:before": { content: 'Lua' },
                                "pre.src-matlab:before": { content: 'MATLAB' },
                                "pre.src-mscgen:before": { content: 'Mscgen' },
                                "pre.src-ocaml:before": { content: 'Objective Caml' },
                                "pre.src-octave:before": { content: 'Octave' },
                                "pre.src-org:before": { content: 'Org mode' },
                                "pre.src-oz:before": { content: 'OZ' },
                                "pre.src-plantuml:before": { content: 'Plantuml' },
                                "pre.src-processing:before": { content: 'Processing.js' },
                                "pre.src-python:before": { content: 'Python' },
                                "pre.src-R:before": { content: 'R' },
                                "pre.src-ruby:before": { content: 'Ruby' },
                                "pre.src-sass:before": { content: 'Sass' },
                                "pre.src-scheme:before": { content: 'Scheme' },
                                "pre.src-screen:before": { content: 'Gnu Screen' },
                                "pre.src-sed:before": { content: 'Sed' },
                                "pre.src-sh:before": { content: 'shell' },
                                "pre.src-sql:before": { content: 'SQL' },
                                "pre.src-sqlite:before": { content: 'SQLite' },
                                "pre.src-forth:before": { content: 'Forth' },
                                "pre.src-io:before": { content: 'IO' },
                                "pre.src-J:before": { content: 'J' },
                                "pre.src-makefile:before": { content: 'Makefile' },
                                "pre.src-maxima:before": { content: 'Maxima' },
                                "pre.src-perl:before": { content: 'Perl' },
                                "pre.src-picolisp:before": { content: 'Pico Lisp' },
                                "pre.src-scala:before": { content: 'Scala' },
                                "pre.src-shell:before": { content: 'Shell Script' },
                                "pre.src-ebnf2ps:before": { content: 'ebfn2ps' },
                                "pre.src-cpp:before": { content: 'C++' },
                                "pre.src-abc:before": { content: 'ABC' },
                                "pre.src-coq:before": { content: 'Coq' },
                                "pre.src-groovy:before": { content: 'Groovy' },
                                "pre.src-bash:before": { content: 'bash' },
                                "pre.src-csh:before": { content: 'csh' },
                                "pre.src-ash:before": { content: 'ash' },
                                "pre.src-dash:before": { content: 'dash' },
                                "pre.src-ksh:before": { content: 'ksh' },
                                "pre.src-mksh:before": { content: 'mksh' },
                                "pre.src-posh:before": { content: 'posh' },
                                "pre.src-ada:before": { content: 'Ada' },
                                "pre.src-asm:before": { content: 'Assembler' },
                                "pre.src-caml:before": { content: 'Caml' },
                                "pre.src-delphi:before": { content: 'Delphi' },
                                "pre.src-html:before": { content: 'HTML' },
                                "pre.src-idl:before": { content: 'IDL' },
                                "pre.src-mercury:before": { content: 'Mercury' },
                                "pre.src-metapost:before": { content: 'MetaPost' },
                                "pre.src-modula-2:before": { content: 'Modula-2' },
                                "pre.src-pascal:before": { content: 'Pascal' },
                                "pre.src-ps:before": { content: 'PostScript' },
                                "pre.src-prolog:before": { content: 'Prolog' },
                                "pre.src-simula:before": { content: 'Simula' },
                                "pre.src-tcl:before": { content: 'tcl' },
                                "pre.src-tex:before": { content: 'TeX' },
                                "pre.src-plain-tex:before": { content: 'Plain TeX' },
                                "pre.src-verilog:before": { content: 'Verilog' },
                                "pre.src-vhdl:before": { content: 'VHDL' },
                                "pre.src-xml:before": { content: 'XML' },
                                "pre.src-nxml:before": { content: 'XML' },
                                "pre.src-conf:before": { content: 'Configuration File' },*/
