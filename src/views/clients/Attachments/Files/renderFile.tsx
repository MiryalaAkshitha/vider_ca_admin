import { Box } from "@mui/system";
import { icons } from "assets";
import { FILETYPES } from "types";

export const renderFile = (data) => {
  switch (data?.fileType) {
    case FILETYPES.JPEG:
      return <ImageFile url={data?.fileUrl} />;
    case FILETYPES.JPG:
      return <ImageFile url={data?.fileUrl} />;
    case FILETYPES.SVG:
      return <ImageFile url={data?.fileUrl} />;
    case FILETYPES.PNG:
      return <ImageFile url={data?.fileUrl} />;
    case FILETYPES.PDF:
      return <PdfFile url={data?.fileUrl} />;
    case FILETYPES.TEXT:
      return <TextFile url={data?.fileUrl} />;
    case FILETYPES.CSV:
      return <CsvFile url={data?.fileUrl} />;
    case FILETYPES.DOC1:
      return <DocFile url={data?.fileUrl} />;
    case FILETYPES.DOC2:
      return <DocFile url={data?.fileUrl} />;
    case FILETYPES.DOC3:
      return <DocFile url={data?.fileUrl} />;
    case FILETYPES.PRESENTATION1:
      return <PptFile url={data?.fileUrl} />;
    case FILETYPES.PRESENTATION2:
      return <PptFile url={data?.fileUrl} />;
    case FILETYPES.PRESENTATION3:
      return <PptFile url={data?.fileUrl} />;
    case FILETYPES.SHEET1:
      return <ExecelFile url={data?.fileUrl} />;
    case FILETYPES.SHEET2:
      return <ExecelFile url={data?.fileUrl} />;
    case FILETYPES.SHEET3:
      return <ExecelFile url={data?.fileUrl} />;
    case FILETYPES.ZIP1:
      return <ZipFile url={data?.fileUrl} />;
    case FILETYPES.ZIP2:
      return <ZipFile url={data?.fileUrl} />;
    case FILETYPES.MP4:
      return <VideoFile url={data?.fileUrl} />;
    case FILETYPES.WEBM:
      return <VideoFile url={data?.fileUrl} />;
    default:
      break;
  }
};

const ImageFile = ({ url }: any) => (
  <img
    src={url}
    style={{ width: "100%", objectFit: "cover", height: "100%" }}
    alt=''
  />
);

const PdfFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.pdf} width={80} alt='' />
  </Box>
);

const TextFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.text} width={80} alt='' />
  </Box>
);

const CsvFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.csv} width={80} alt='' />
  </Box>
);

const DocFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.doc} width={80} alt='' />
  </Box>
);

const ExecelFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.excel} width={80} alt='' />
  </Box>
);

const PptFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.ppt} width={80} alt='' />
  </Box>
);

const ZipFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.zip} width={80} alt='' />
  </Box>
);

const VideoFile = ({ url }) => (
  <Box
    width='100%'
    height='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <img src={icons.video} width={80} alt='' />
  </Box>
);
