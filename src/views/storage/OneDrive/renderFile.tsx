import { icons } from "assets";
import { FILETYPES } from "data/constants";

export const renderFile = (data: any) => {
  switch (data?.mimeType) {
    case FILETYPES.PDF:
      return <PdfFile url={data?.fileUrl} icon={icons.pdf} />;
    case FILETYPES.TEXT:
      return <PdfFile url={data?.fileUrl} icon={icons.text} />;
    case FILETYPES.CSV:
      return <PdfFile url={data?.fileUrl} icon={icons.csv} />;
    case FILETYPES.DOC1:
      return <PdfFile url={data?.fileUrl} icon={icons.doc} />;
    case FILETYPES.DOC2:
      return <PdfFile url={data?.fileUrl} icon={icons.doc} />;
    case FILETYPES.DOC3:
      return <PdfFile url={data?.fileUrl} icon={icons.doc} />;
    case FILETYPES.PRESENTATION1:
      return <PdfFile url={data?.fileUrl} icon={icons.ppt} />;
    case FILETYPES.PRESENTATION2:
      return <PdfFile url={data?.fileUrl} icon={icons.ppt} />;
    case FILETYPES.PRESENTATION3:
      return <PdfFile url={data?.fileUrl} icon={icons.ppt} />;
    case FILETYPES.SHEET1:
      return <PdfFile url={data?.fileUrl} icon={icons.excel} />;
    case FILETYPES.SHEET2:
      return <PdfFile url={data?.fileUrl} icon={icons.excel} />;
    case FILETYPES.SHEET3:
      return <PdfFile url={data?.fileUrl} icon={icons.excel} />;
    case FILETYPES.ZIP1:
      return <PdfFile url={data?.fileUrl} icon={icons.zip} />;
    case FILETYPES.ZIP2:
      return <PdfFile url={data?.fileUrl} icon={icons.zip} />;
    case FILETYPES.MP4:
      return <PdfFile url={data?.fileUrl} icon={icons.video} />;
    case FILETYPES.WEBM:
      return <PdfFile url={data?.fileUrl} icon={icons.video} />;
    case FILETYPES.AUDIO:
      return <PdfFile url={data?.fileUrl} icon={icons.audio} />;
    default:
      break;
  }
};

const PdfFile = ({ url, icon }: any) => (
  <img draggable={false} src={icon} width={80} alt="" />
);
