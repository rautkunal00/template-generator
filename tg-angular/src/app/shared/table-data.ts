export interface TableData {
  stepname: string;
  type: string;
  static: boolean;
  editorType: string;
  totalEB: number;
  totalDDM: number;
  tries: number;
  stepLabel: boolean;
  separateDDMAP: boolean;
  totalActStmt: number;
  totalPassStmt: number;
  editorPos: number;
  tablePos: Array<number>;
  buttons: Array<string>;
  features: Array<string>;
  feedbacks: Array<string>;
  edit_html: string;
}
