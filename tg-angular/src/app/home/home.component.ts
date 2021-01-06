import { HomeData } from './../shared/home-data';
import { TableData } from './../shared/table-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeData : HomeData;
  tabledata: TableData[] = [];
  totalModule: number;
  homeFormGroup: FormGroup =  new FormGroup({
    partSize: new FormControl(1),
    gsSize: new FormControl(0),
    fillAnswer: new FormControl('wofa'),
    accessible: new FormControl(false),
    split: new FormControl(false),
    interchangefn: new FormControl(false),
    isqrt: new FormControl(false),
    numlist: new FormControl(false)
  });
  tableFormGroup: FormGroup;
  control: FormArray;
  dropdownSettings: {};
  tool_type = {
    1: "formed",
    2: "tabed",
    3: "figed"
  }
  englishFileTexts: string[] = [];
  table_structure=``;
  ShowMeTexts:string[] =[];
  object_reference:any = [];
  object_reference_text:any = [];
  object_reference_editor:any = [];
  ans_editor:any = [];
  teacherModule:any =[];
  main_editor_array:any = [];
  editorModule:any  = [];
  countDDm:any =[];
  toolType:any =[];
  countEditor:any =[];
  finalTemplate: any;
  englishTemplate: any;
  features=['letters', 'par1', 'par2', 'par3', 'par', 'numbers', 'plusbox', 'minusbox', 'dot', 'times', 'pow', 'sub', 'list', 'ratio', 'less', 'greater', 'equals', 'factorial', 'chemarrow', 'percent', 'tilde', 'div', 'divs', 'divP', 'pair'];
  feedbacks=['notNumber:"true"', 'checkVariablesNoEqual:"x"', 'fractionNotReduced:"true"', 'nestedFraction:"true"', 'noDecimal:true', 'checkExponentValue:"neg|msg_neg_exponent"', 'repeatList:"true"', 'useUnion:"true"', 'extraInterval:"true"', 'pairNotParentheses:"true"', 'reducedRoots:"true"','pairNotComma:"true"','repeatVariable:"true"'];
  buttons=['div', 'mixednb', 'pow', 'sqrt', 'abs', 'alpha', 'dot', 'approx','equals', 'greater', 'greaterequal', 'less', 'lessequal', 'line_bar', 'list', 'liter', 'ln', 'log', 'i', 'arccos', 'arccot', 'arccsc', 'arcsec', 'arcsin', 'arctan', 'am', 'and', 'bar', 'beta', 'biconditional', 'chemC', 'chemH', 'chemO', 'chemarrow', 'chisqCDF', 'chisq_inv', 'cm', 'cm2', 'cm3', 'conditional', 'conjunction', 'cos', 'cot', 'csc', 'cup', 'dam', 'dam2', 'dam3', 'degree', 'disjunction', 'divs', 'dm', 'dm2', 'dm3', 'doesnotexist', 'dotdotdot', 'emptyset', 'eval', 'exp_', 'fischerCDF', 'factorial', 'fischer_inv', 'floz', 'ft', 'ft2', 'ft3', 'gal', 'gamma', 'gram', 'in', 'inch', 'inch2', 'inch3', 'infimany', 'infinity', 'interval', 'intervalCO', 'intervalOC', 'invcos', 'invsin', 'invtan', 'nPInInZ', 'kL', 'kg', 'km', 'km2', 'km3', 'lambda', 'lb', 'leftsupsub', 'logn', 'm', 'm2', 'm3', 'mL', 'mat11', 'mat21', 'mat31', 'mat41', 'mat12', 'mat22', 'mat32', 'mat13', 'mat23', 'mat33', 'mat34', 'mat14', 'mat44', 'mi', 'mg', 'minusbox', 'mm', 'mm2', 'mm3', 'more', 'more2', 'mu', 'negation', 'neginfinity', 'nobutton', 'normalCDF', 'normal_inv', 'nosol', 'notequal', 'nroot', 'nu', 'or', 'oz', 'ozliq', 'p', 'p_hat', 'pair', 'par', 'percent', 'pi', 'pie', 'pie2', 'pie3', 'pint', 'plusbox', 'plusminus1', 'pm', 'pulg', 'pulg2', 'pulg3', 'qt', 'ratio', 'R', 'ray', 'rho', 's', 'scinot', 'sec', 'segment_line', 'set', 'setbuilder', 'setbuilderwithx', 'setempty', 'sigma', 'sin', 'studentCDF', 'student_inv', 'sub', 'suchthat', 'tan', 'theta', 'times', 'tz', 'undefined', 'undefined2', 'union', 'vector2', 'vector_i', 'vector_j', 'x', 'xbar', 'xprime', 'yhat', 'yprime', 'yd', 'yd2', 'yd3', 'Z','All', 'basic', 'basic2', 'basic3', 'basic4', 'basic_segment', 'basic_segment2', 'bigdot', 'bigdotline', 'bigdotruler', 'bigdotsegment', 'chemistry_attraction', 'chemistry_crystal', 'chemistry_distribution', 'chemistry_line_distribution', 'chemistry_polarization', 'compass_tutorial', 'conic', 'conic2', 'conic3', 'conic4', 'conic_grid', 'crop', 'crop2', 'croporientation', 'cst', 'cst_jump', 'cstp', 'cstp_tutorial', 'cstPanel', 'cstpSE', 'cstSE', 'curve', 'e_log', 'easy_ray_tutorial', 'easy_ruler', 'easy_ruler_tutorial', 'easy_segment_tutorial', 'functiontransformation', 'functiontransformation2', 'graphCalcTest', 'label_tutorial', 'lineray', 'linerayline', 'lineraysegment', 'lineraysegment_nopencil', 'lineraysegment2', 'linesegment', 'measure_ruler', 'measure_rulers', 'movevector', 'numline', 'numline_highed', 'numlinenosol', 'numlinepoint', 'orientation1', 'orientation2', 'ruler_points', 'segment', 'parabola', 'parabola2', 'parabola_noruler', 'parabola_tutorial', 'parabola_zone', 'parabola_zone2', 'phase', 'piecewise', 'piecewisetest', 'point', 'point_no_grid', 'polar', 'polarbasic', 'polarsimple', 'polynomialfunctions', 'protractor', 'rational', 'rational2', 'rational_demo', 'reflection', 'ruler', 'ruler_only', 'seruler_only', 'square', 'tangent', 'transformation3', 'trigo2', 'trigo2_tutorial', 'trigo3_tutorial', 'pencilgrid_graphfunction', 'trigo_asym', 'trigo_tutorial', 'trigoD', 'trigoSimple', 'vector', 'vector_tutorial', 'zone', 'zone1', 'zone2', 'zone_label', 'zone_only', 'zone_prob', 'zonefull_only'];

  constructor(private fb: FormBuilder) {
    this.homeData = this.homeFormGroup.value;

  }

  initiateForm(type:string, name:string): FormGroup {
    return this.fb.group({
      stepname: [name],
      type: [type],
      static: [false],
      editorType: [1],
      totalEB: [1],
      totalDDM: [0],
      tries: [3],
      stepLabel: [false],
      separateDDMAP: [false],
      totalActStmt: [0],
      totalPassStmt: [0],
      editorPos: [0],
      tablePos: ["0"],
      buttons: [],
      features: [],
      feedbacks: []
    });
  }

  ngOnInit(): void {
    this.generateTableView();

  }

  get getFormControls() {
    const control = this.tableFormGroup.get('tableRows') as FormArray;
    return control;
  }

  //on submit click populate table data
  onSubmit() {
    this.homeData = this.homeFormGroup.value;
    this.generateTableView();
    this.ShowMeTexts = [];
    this.finalTemplate = "";
    this.englishTemplate = "";
  }

  //on fill Answer or without fill answer toggle change
  changeFAToggle($event: any, faval: string) {
    this.homeFormGroup.reset();
    this.homeFormGroup.setValue({
      partSize: 1,
      gsSize: 0,
      fillAnswer: faval,
      accessible: false,
      split: false,
      interchangefn: false,
      isqrt: false,
      numlist: false
    });
    this.homeData = this.homeFormGroup.value;
    this.generateTableView();
    this.ShowMeTexts = [];
    this.finalTemplate = "";
    this.englishTemplate = "";
  }

  onPartInputChange(e) {
    this.onSubmit();
  }

  onGSInputChange(e) {
    this.onSubmit();
  }

  //populate default table view with part and gs numbers
  populateTableDataArray() {
    let data = this.homeData
    let stepName = "";
    let type = "";
    let tabled = [];
    this.tableFormGroup = this.fb.group({
      tableRows: this.fb.array([])
    });
    for (let index = 1; index <= this.totalModule; index++) {
      if (index <= data.partSize) {
        stepName = 'I' + index;
        type = 'I';

      } else {
        stepName = 'GS' + (index - data.partSize);
        type = 'GS';
      }
      let d = {
        stepname: stepName,
        type: type,
        static: false,
        editorType: "formed",
        totalEB: 1,
        totalDDM: 0,
        tries: 3,
        stepLabel: false,
        separateDDMAP: false,
        totalActStmt: 0,
        totalPassStmt: 0,
        editorPos: 0,
        tablePos: ["0"],
        buttons: [],
        features: [],
        feedbacks: []
      }
      tabled.push(d);
      //this.cdr.detectChanges();
      this.control = this.tableFormGroup.get('tableRows') as FormArray;
      this.control.push(this.initiateForm(type, stepName));
    }
    this.tabledata = tabled;
  }

  //create table view
  generateTableView() {
    this.totalModule = this.homeData.partSize + this.homeData.gsSize;
    this.populateTableDataArray();

  }

  //on change editor type ddm ****** NOT IN USE *********
  changeEditor(e) {
    this.tableFormGroup.get('editorType').setValue(e.target.value, {
      onlySelf: true
   })
    this.control.controls.forEach((group: FormGroup, index) => {
      this.tabledata[index] = Object.assign(this.tabledata[index], this.tableFormGroup.controls.tableRows.value[index]);
    })
  }

  //on static checkbox toggle
  toggleSelection(flag, rowNum) {

    if (flag.checked === true) {
      this.control.controls.forEach((group: FormGroup, index) => {
        if (index === rowNum) {
          let editorType = group.get('editorType') as FormControl;
          editorType.disable()
          let totalEB = group.get('totalEB') as FormControl;
          totalEB.disable()
          let totalDDM = group.get('totalDDM') as FormControl;
          totalDDM.disable()
          let separateDDMAP = group.get('separateDDMAP') as FormControl;
          separateDDMAP.disable()
          let editorPos = group.get('editorPos') as FormControl;
          editorPos.disable()
        }
        this.tabledata[index] = Object.assign(this.tabledata[index], this.tableFormGroup.controls.tableRows.value[index]);
      })
    } else {
      this.control.controls.forEach((group: FormGroup, index) => {
        if (index === rowNum) {
          let editorType = group.get('editorType') as FormControl;
          editorType.enable()
          let totalEB = group.get('totalEB') as FormControl;
          totalEB.enable()
          let totalDDM = group.get('totalDDM') as FormControl;
          totalDDM.enable()
          let separateDDMAP = group.get('separateDDMAP') as FormControl;
          separateDDMAP.enable()
          let editorPos = group.get('editorPos') as FormControl;
          editorPos.enable()
        }
        this.tabledata[index] = Object.assign(this.tabledata[index], this.tableFormGroup.controls.tableRows.value[index]);
      })
    }

  }

  // generate template isl ang eng
  onGenerate() {
    this.homeData = this.homeFormGroup.value;
    this.control.controls.forEach((group: FormGroup, index) => {
      if (typeof(this.tableFormGroup.controls.tableRows.value[index].tablePos) === "string"){
        this.tableFormGroup.controls.tableRows.value[index].tablePos = this.tableFormGroup.controls.tableRows.value[index].tablePos.split(",").map(function (item) {
            return parseInt(item, 10);
        });
      }
      this.tabledata[index] = Object.assign(this.tabledata[index], this.tableFormGroup.controls.tableRows.value[index]);
    })

    let statementModuleListQuoted = [];
    let resolutionModuleListQuoted = [];
    let statementModuleList = [];
    let resolutionModuleList = [];
    this.table_structure = ``;
    this.object_reference = [];
    this.object_reference_text = [];
    this.object_reference_editor = [];
    this.ShowMeTexts = [];
    this.englishFileTexts = [];
    this.finalTemplate = "";
    this.englishTemplate = "";
    this.countEditor = [];
    this.countDDm =[];
    this.toolType =[];
    this.ans_editor = [];
    this.teacherModule =[];

    this.tabledata.forEach((item) => {
      if (item.type == "I") {
        statementModuleListQuoted.push('"' + item.stepname + '"');
        statementModuleList.push(item.stepname);
      } else {
        resolutionModuleListQuoted.push('"' + item.stepname + '"');
        resolutionModuleList.push(item.stepname);
      }
    })
    let statementModuleReturnValues = this.generateStatementSteps(statementModuleListQuoted)
    let resolutionModuleReturnValues = this.generateResolutionSteps(resolutionModuleListQuoted);
    let statementSteps = this.getStatementSteps(statementModuleList);
    let resolutionSteps = this.getResolutionSteps(resolutionModuleList);
    let ansproMapping = this.getAnsproMapping()
    let ansproRule = this.getAnsproRule()
    let ansproCatches = this.getAnsproCatches()
    let evaluationBlocks = this.generateEvaluations(ansproRule,ansproCatches);
    let teacherModule = this.generateTeacherModule();
    let ans_teacher = this.generateTeacherSimple();
    let no_of_tries = this.generateTries();
    let has_step_label = this.generateStepLabel();
    let splitcodeArray = [];
    let splitInstanceblock = "";
    let adaLines = "";
    let customFunction = this.addCustomFunction();
    if (this.homeData.split) {
      splitcodeArray = this.getSplitCodeLines();
      splitInstanceblock= this.getSplitCodeInstanceblock();
    }

    if (this.homeData.accessible) {
      adaLines = this.getAdaCodeLines();
    }

    if (this.homeData.fillAnswer === "wfa") {
      let teacherHTMLModule = this.generateHTMLTeacherModuleWithFA();
      this.finalTemplate = this.getISLCodeWithFA(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label,adaLines,customFunction)

    } else {
      let teacherHTMLModule = this.generateHTMLTeacherModule();
      this.finalTemplate = this.getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label,splitcodeArray, splitInstanceblock,adaLines,customFunction)
    }
    this.englishTemplate = this.getENGLISHCode()
    /*console.log("very funny \n" + statementModuleReturnValues + "\n" +
    resolutionModuleReturnValues + "\n" + statementSteps + "\n" + resolutionSteps + "\n" +
    ansproMapping + "\n" + evaluationBlocks + "\n" + teacherModule + "\n" + ans_teacher + "\n" +
    no_of_tries + "\n" + has_step_label)*/
  }
  addCustomFunction() {
    let customFunctionText = ``;
    if (this.homeData.interchangefn) {
      customFunctionText += `
      <function name=interchangableAP list={gs,num}>
      <var name=tlist value={}> 
      <var name=slist value={}> 
      <var name=numLength value=length(@num;)>
      <for name=k value=1 cond=(@k; <= @numLength;) next=(@k; + 1)>
        &(addElem(tlist, "@("teacher_answer@num[@k;];");"));
        &(addElem(slist, "@("student_answer@num[@k;];");"));
      </for>
      <for name=i value=1 cond=(@i;<=@numLength;) next=(@i;+1)>  
        <for name=j value=1 cond=(@j;<=@numLength;) next=(@j;+1)>
          <evaluation rule=arith2 teacher="@tlist[@j;];" student="@slist[@i;];">
          <feedback>
            &(@userFeedback.arithGen());
            <var name=check value="@itemAnspro.getCurrentFeedbackField('value');">
          </feedback>
          <if cond=(@j;<=9)>
            &(@itemAnspro.storeFeedback("@gs;.0@num[@i;];"););
          <else>
            &(@itemAnspro.storeFeedback("@gs;.@num[@i;];"););
          </if>
          <if cond=('@check' == "Correct")>       
                &(setElemAt(tlist,">>",@j;));
                <var name=j value=@numLength;>            
          </if>
        </for>            
      </for>
    </function>
    <!--
    How to call :
    &(@interchangableAP("GS2",{3,4,5}););
    &(@itemAnspro.registerFeedback("GS2.03"))
    &(@itemAnspro.registerFeedback("GS2.04"))
    &(@itemAnspro.registerFeedback("GS2.05")) 
    -->
    `;
    }
    if (this.homeData.isqrt) {
      customFunctionText += `
      <function name=retSqrtNot list={num,anspro}>
        <var name=sqrt_val value=(@userf.simplify_sqrt(@num;))>
        <if cond=(@sqrt_val[1]==1 && @sqrt_val[2]!=1 && @anspro;==1)>
          <return value="\\sqrt;[@num;]">
        <else cond=(@sqrt_val[1]==1 && @sqrt_val[2]!=1 && @anspro;==0)>
          <return value="<sqrt>@num;</sqrt>">
        <else>
          <return value="@sqrt_val[1];">
        </if>
      </function>
      `;
    }
    if (this.homeData.numlist) {
      customFunctionText += `
      <function name=generate_num_list list={start_num, end_num, step, exclude_lst}>
        <var name=step value=("@step;"=="" ? 1 : @step;)>
        <var name=num_list value={}>
        <for name=start value=@start_num cond=(@start;<=@end_num;) next=(@start;+@step;)>
          <if cond=(hasElem(@exclude_lst;,@start;)==0)>
            &(addElem(num_list,@start;));
          </if>
        </for>
        <return value=@num_list;>
      </function>
      <!--
      generate_num_list: return list of num/floats      
      1.start_num: starting number of the list            
      2.end_num: ending number include in the list 
      3.step: next number increment 
      4.exclude_lst: exclude the numbers in this list
      -->
      `;
    }
    
    return customFunctionText;
  }

  getAdaCodeLines() {
    const adaLines = '<var name=nlh value=\"@.newLineHint;\">';
    return adaLines;
  }

  getSplitCodeLines() {
    const splitcodeArray = ["<var? name=qmode_list value={}>","<SIGNATURE NAME=past.qmode VALUE=\"@qmode;\">","<REQUIRES COND=(@history;>=length(@qmode_list;) || \"@qmode;\"!=\"@past.qmode;\")>"];
    return splitcodeArray;
  }

  getSplitCodeInstanceblock() {
    let instanceblock= `
    <INSTANCE>
      <rvalue name=qmode list=@qmode_list; index=qmode_index>
    </INSTANCE>
    <REQUIREMENT>
    </REQUIREMENT>
    `;
    return instanceblock;
  }

  generateStatementSteps(statementSteps) {
    const returnValueStatementSteps = "<return value={"+statementSteps.join(',').toString()+"}>";
    return returnValueStatementSteps;
  }

  generateResolutionSteps(resolutionSteps) {
    const returnValueResolutionSteps = "<return value={"+resolutionSteps.join(',').toString()+"}>";
    return returnValueResolutionSteps;
  }

  getStatementSteps(statementSteps) {
    let statementModuleArr = [];
    for(let i=1; i<=statementSteps.length; i++) {
      let textstatements=this.tabledata[i-1].totalActStmt;
      let editstatement=this.tabledata[i-1].editorPos;
      let array_table=this.tabledata[i-1].tablePos;
      let passivestatements=this.tabledata[i-1].totalPassStmt;
      let editext=``;
      let passiveModuleTexts=``;
      let passivestatementModuleTexts=``;
      let passivecode;
      let statementModuleTool;
      let statementModuleTexts=``;
      let statementModuleEnglishTexts=``;

      if(!(editstatement==0)){
        editext+= array_table.includes(editstatement)  ? `i`+i+`_`+`table`+`_`+editstatement : `I`+i+`_`+`text`+`_`+editstatement;}
      let statementVarTool = (this.tabledata[i-1].editorType=="3")?`
      @iBeg;`:``;
      if(!this.tabledata[i-1].static || this.tabledata[i-1].editorType=="3") {
        statementModuleTool= this.generateToolWithObjects(i-1,i-1,statementSteps,1,editext)
        let toolMode= (this.tabledata[i-1].editorType==="3" && this.tabledata[i-1].static)?"display":"editor";
        statementVarTool += `
                @`+this.tool_type[this.tabledata[i-1].editorType]+`_`+toolMode+`_`+statementSteps[i-1]+`;`;
      }
      else {
          statementModuleTool = ``;
          statementVarTool = ``;
      }
      statementVarTool += (this.tabledata[i-1].editorType=="3")?`  @iEnd;
          `:``;
        for(let j=1; j<=textstatements; j++) {
            let booll=array_table.includes(j);
            if(j!=editstatement && !booll){
                statementModuleTexts += `
                <p>%I`+i+`_`+`text`+`_`+j+`;`+`</p>`;
                statementModuleEnglishTexts += `
                <p>%I`+i+`_`+`text`+`_`+j+`;`+`</p>`;
            }
            else if(booll && j!=editstatement)
            {
                statementModuleTexts += `
                %i`+i+`_`+`table`+`_`+j+`;`;
            }
            else
            {
                if(booll===true)
                {
                statementModuleTexts+=statementVarTool;
                }
                else
                {
                statementModuleEnglishTexts += `
                <p>%I`+i+`_`+`text`+`_`+j+`;`+`</p>`;
                statementModuleTexts+=statementVarTool;
                }
            }
        }
        for(let j=1; j<=passivestatements; j++) {
          let booll=array_table.includes(textstatements+j);
          let table_num=textstatements+j;
            if(booll) {
              passiveModuleTexts += `
                %i`+i+`_`+`table`+`_`+table_num+`;`

                passivestatementModuleTexts += `&(text(i`+i+`_`+`table`+`_`+table_num+`));`
            } else {
              passiveModuleTexts += `
                <p>%I`+i+`_`+`passivetext`+`_`+table_num+`;`+`</p>`

                passivestatementModuleTexts += `<p>&(text(I`+i+`_`+`passivetext`+`_`+table_num+`));`+`</p>`
            }
        }
        passivecode=passivestatements!=0 ? `
                &(("@modeRequested;"=="static") ? "${passivestatementModuleTexts}"  : "");` : ``;
        this.creatingTableStructure(i,array_table,'i');
        let commentHeader = "<!-- *************************************** " + statementSteps[i - 1] + " ***************************************-->";
        let statementModuleTitle = "<function name=StatementModule_"+statementSteps[i-1]+" list={modeRequested}>";
        let statementModule = `
          ${commentHeader}
          ${statementModuleTitle}  ${statementModuleTool}
            <TEXT REF=INTERACTION>\t${statementModuleTexts}${passivecode}
            </TEXT>
            <return value="INTERACTION">
          </function>
        `;
        statementModuleEnglishTexts+=passiveModuleTexts;
        statementModuleArr.push(statementModule);
        this.englishFileTexts.push(statementModuleEnglishTexts);
        this.tabledata[i-1]={...this.tabledata[i-1],edit_html:editext}
    }
    return statementModuleArr.join("");
  }

  getResolutionSteps(resolutionSteps) {
    let resolutionModuleArr = [];
    for(let i=1; i<=resolutionSteps.length; i++) {
        let resolutionModuleTool;
        let textstatements=this.tabledata[i-1+this.homeData.partSize].totalActStmt;
        let passivestatements=this.tabledata[i-1+this.homeData.partSize].totalPassStmt;
        let editstatement=this.tabledata[i-1+this.homeData.partSize].editorPos;
        let array_table=this.tabledata[i-1+this.homeData.partSize].tablePos;
        let editext=``;
        let statementModuleTexts=``;
        let statementModuleSMTexts=``;
        let passiveModuleTexts=``;
        let passivestatementModuleTexts=``;
        let passivecode;
        if(!(editstatement==0)){
        editext+= array_table.includes(editstatement)  ? `gs`+i+`_`+`table`+`_`+editstatement : `GS`+i+`_`+`text`+`_`+editstatement;}
        let resolutionVarTool = (this.tabledata[i-1+this.homeData.partSize].editorType=="3")?`
        @iBeg;`:``;
        if(!this.tabledata[i-1+this.homeData.partSize].static || this.tabledata[i-1+this.homeData.partSize].editorType=="3") {
            resolutionModuleTool = this.generateToolWithObjects(i-1+this.homeData.partSize,i-1,resolutionSteps,2,editext)
        let toolMode= (this.tabledata[i-1+this.homeData.partSize].editorType=="3" && this.tabledata[i-1+this.homeData.partSize].static)?"display":"editor";
            resolutionVarTool+=`
                @`+this.tool_type[this.tabledata[i-1+this.homeData.partSize].editorType]+`_`+toolMode+`_`+resolutionSteps[i-1]+`;`;
        }
        else {
            resolutionModuleTool = ``;
            resolutionVarTool+=``;
        }

        resolutionVarTool += (this.tabledata[i-1+this.homeData.partSize].editorType=="3")?`  @iEnd;
            `:``;
        for(let j=1; j<=textstatements; j++) {
            let booll=array_table.includes(j);
            if(j!=editstatement && !booll){
            statementModuleTexts += `
                <p>%GS`+i+`_`+`text`+`_`+j+`;`+`</p>`;
                statementModuleSMTexts += `
                <p>%GS`+i+`_`+`text`+`_`+j+`;`+`</p>`;
            }
            else if(booll && j!=editstatement)
            {
                statementModuleTexts += `
                %gs`+i+`_`+`table`+`_`+j+`;`;
                statementModuleSMTexts += `
                %gs`+i+`_`+`table`+`_`+j+`;`;
            }
            else
            {
                if(booll)
                {
                statementModuleSMTexts += `
                %gs`+i+`_`+`table`+`_`+j+`;`;
                statementModuleTexts += resolutionVarTool;
                }
                else
                {
                statementModuleSMTexts += `
                <p>%GS`+i+`_`+`text`+`_`+j+`;`+`</p>`;
                statementModuleTexts += resolutionVarTool;
                }
            }
        }
        this.creatingTableStructure(i,array_table,'gs');
        let commentHeader = "<!-- *************************************** " + resolutionSteps[i - 1] + " *************************************** -->";
        for(let j=1; j<=passivestatements; j++) {
          let booll=array_table.includes(textstatements+j);
          let table_num=textstatements+j;
            if(booll) {
              passiveModuleTexts += `
                %gs`+i+`_`+`table`+`_`+table_num+`;`

                passivestatementModuleTexts += `&(text(gs`+i+`_`+`table`+`_`+table_num+`));`
            } else {
              passiveModuleTexts += `
                <p>%GS`+i+`_`+`passivetext`+`_`+table_num+`;`+`</p>`

                passivestatementModuleTexts += `<p>&(text(GS`+i+`_`+`passivetext`+`_`+table_num+`));`+`</p>`
            }
            
        }
        passivecode=passivestatements!=0 ? `
                &(("@modeRequested;"=="static") ? "${passivestatementModuleTexts}"  : "");` : ``;
        let resolutionModuleTitle = "<function name=ResolutionModule_"+resolutionSteps[i-1]+" list={modeRequested}>";
        let resolutionModule = `
          ${commentHeader}
          ${resolutionModuleTitle}   ${resolutionModuleTool}
              <TEXT REF=SOLUTION>${statementModuleTexts}${passivecode}
              </TEXT>
              <return value="SOLUTION">
          </function>
        `;
        resolutionModuleArr.push(resolutionModule);
        statementModuleSMTexts+=passiveModuleTexts;
        this.englishFileTexts.push(statementModuleSMTexts);
        this.ShowMeTexts.push(statementModuleSMTexts);
        this.tabledata[i-1+this.homeData.partSize]={...this.tabledata[i-1+this.homeData.partSize],edit_html:editext}
    }
    return resolutionModuleArr.join("");
  }

  generateToolWithObjects(moduleNumber,toolNumber,toolStep,part,editext) {
    let toolMode= (this.tabledata[moduleNumber].editorType=="3" && this.tabledata[moduleNumber].static)?"display":"editor";
    let editorObject=``;
    let tool_object=``;
    let tool_object_text=``;
    let paramsRecall=``;
    let mediaList= this.mediaListGenerator(moduleNumber);

    let buttons="";
    if (!!this.tabledata[moduleNumber].buttons) {
      buttons=this.tabledata[moduleNumber].buttons.map( (element) => {
        if(this.tabledata[moduleNumber].editorType == "3")
          {return element;}
          else{return '\"'+element+'\"';}
      }).join(",");
    }

    let features="";
    if (!!this.tabledata[moduleNumber].features) {
      features=this.tabledata[moduleNumber].features.map( (element) => {
        return '\"'+element+'\"';
      }).join(",");
    }
    let feedbacks:any ="";
    if (!!this.tabledata[moduleNumber].feedbacks) {
      feedbacks=((part==1) ? this.tabledata[moduleNumber].feedbacks.join(",") : []);
    }
    let button_feature=``;
    let button_feature_t=``;
    let button_feature_f=``;
    let feature_t=``;
    button_feature += (buttons.length>0) ? `,\n\t\textraButtons:{${buttons}}` : ``;
    button_feature_t += (buttons.length>0) ? `,\n\t\textraButtons:{${buttons}}` : ``;
    button_feature_f += (buttons.length>0) ? `,\n\t\tmenu:${buttons}` : ``;
    if(feedbacks.length>0 && features.length>0)
    {
        feature_t=`,\n\t\tmediaFeatures:#{ansed:#{feedbacks:#{${feedbacks}},keyboard:{${features}}}}`;
    }
    else if(feedbacks.length>0)
    {
        feature_t=`,\n\t\tmediaFeatures:#{ansed:#{feedbacks:#{${feedbacks}}}}`;
    }
    else if(features.length>0)
    {
        feature_t=`,\n\t\tmediaFeatures:#{ansed:#{keyboard:{${features}}}}`;
    }
    else
    {
        feature_t=``;
    }

    let feature_f = (features.length>0) ? `,\n\t\tfeatures:#{ansed:#{input:#{keyboard:{${features}}}}}` : ``;

    if(part==1 && this.tabledata[moduleNumber].editorType == "1"){
        paramsRecall= `
        \trecall:text(${editext}),
        \tfeedbacks:#{${feedbacks}}${button_feature}${feature_f}
        \t`;
  }
    else if(part==1 && this.tabledata[moduleNumber].editorType == "2"){
        paramsRecall= `
        \trecall:text(${editext}),
        \tmediaList:{`+mediaList+`}${button_feature_t}${feature_t}
        \t`;
    }
    else if(part==2 && this.tabledata[moduleNumber].editorType == "2"){
        paramsRecall= `
        \trecall:text(${editext}),
        \tmediaList:{`+mediaList+`}${button_feature_t}${feature_t}
        \t`;
    }
    else if(part==2 && this.tabledata[moduleNumber].editorType == "1")
    {
        paramsRecall= `
        \trecall:text(${editext})${button_feature}${feature_f}
        \t`;
    }
    else{
        paramsRecall= `
        \trecall:text(${editext}),
        \tfeatures:#{${this.homeData.accessible ? 'accessibleDisplay:true': ''}},
        \tmenuXY:frac_alge,
        \twidth:350,height:350${button_feature_f}`
    }
    let paramsName =this.tabledata[moduleNumber].editorType+`Params`+toolStep[toolNumber]+``;
    var num= this.tabledata[moduleNumber].totalEB+this.tabledata[moduleNumber].totalDDM;
    if(!(this.tabledata[moduleNumber].editorType=="3" || this.tabledata[moduleNumber].static)){
        for(let j=1;j<=num;j++){
            if(j<=this.tabledata[moduleNumber].totalEB){
                if(this.tabledata[moduleNumber].stepname.charAt(0)!="I"){
                    tool_object_text=`
                    <p>%GS`+j+`_text_`+j+`</p>
                    `;
                    this.object_reference_text.push(tool_object_text);
                }
                tool_object =`
          <text ref=`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_source_`+toolStep[toolNumber]+`_`+j+`></text>`;
                    this.object_reference.push(tool_object);
                editorObject+=`
            <text ref=`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=ansed returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>\\\\editbox;[]</object></text>`;
             }
            else{
                tool_object = `
          <text ref=` + this.tool_type[this.tabledata[moduleNumber].editorType] + `_source_` + toolStep[toolNumber] + `_` + j + `></text>`;
                this.object_reference.push(tool_object);
                editorObject+=`
            <text ref=`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=UIChoice returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>
                <option value="1"></option>
                <option value="2"></option></object></text>`;
            }
        }
        this.object_reference_editor.push(editorObject);
    }

    if(this.homeData.fillAnswer === "wfa"){
      const statementModuleTool = `
            <var name=`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_`+toolMode+`_`+toolStep[toolNumber]+` value=@.toolLayout.createTool('`+this.tool_type[this.tabledata[moduleNumber].editorType]+`','`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_`+toolStep[toolNumber]+`','`+toolMode+`',#{`+paramsRecall+`});>`;
            return statementModuleTool;
    } else {
      const statementModuleTool = `${editorObject}
            <var name=`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_`+toolMode+`_`+toolStep[toolNumber]+` value=@.toolLayout.createTool('`+this.tool_type[this.tabledata[moduleNumber].editorType]+`','`+this.tool_type[this.tabledata[moduleNumber].editorType]+`_`+toolStep[toolNumber]+`','`+toolMode+`',#{`+paramsRecall+`});>`;
            return statementModuleTool;
    }

  }

  creatingTableStructure(index,array_table,part) {
    if(!(array_table.length===1 && array_table[0]===0))
    {
        for(let i=0;i<array_table.length;i++)
        {
            this.table_structure+= `
          <text ref=`+part+index+`_`+`table`+`_`+array_table[i]+`>
              @iBeg;
              <table role="presentation">
                  <tr valign=baseline height=@table_height;>
                      <td width=@table_width; align=right>@userf.disp("");</td>
                      <td>@varEqualTo;</td>
                      <td></td>
                  </tr>
              </table>
              @iEnd;
          </text>
                            `
        }
    }
  }

  mediaListGenerator(moduleNumber){
    let mediaList='html';
    if(this.tabledata[moduleNumber].totalEB != 0){
        mediaList=mediaList.concat(",ansed");
    }
    if(this.tabledata[moduleNumber].totalDDM != 0){
        mediaList=mediaList.concat(",UIChoice");
    }
    if(this.tabledata[moduleNumber].totalDDM == 0 && this.tabledata[moduleNumber].totalEB == 0){
        mediaList=mediaList.concat(",checkbox");
    }
    return mediaList;
  }

  getAnsproMapping() {
    var anspro_mapping =[];
    var editor;
    var mapping;
    this.main_editor_array = [];
    this.editorModule = [];
    this.countDDm = [];
    this.editorModule = [];
    this.toolType = [];
    for (let i=1; i<=this.homeData.partSize; i++) {
        if(!this.tabledata[i-1].static) {
            editor = this.tool_type[this.tabledata[i-1].editorType]+"_"+this.tabledata[i-1].stepname;
            mapping = this.tabledata[i-1].stepname+":{\""+this.tool_type[this.tabledata[i-1].editorType]+"_"+this.tabledata[i-1].stepname+"\"}";
            this.main_editor_array.push(editor);
            anspro_mapping.push(mapping);
            this.editorModule.push(this.tabledata[i-1].stepname);
            this.countDDm.push(this.tabledata[i-1].totalDDM)
            this.countEditor.push(this.tabledata[i-1].totalEB)
            this.toolType.push(this.tool_type[this.tabledata[i-1].editorType])
        }
    }
    for (let i=1; i<=this.homeData.gsSize; i++) {
        if(!this.tabledata[i-1+this.homeData.partSize].static) {
            editor = this.tool_type[this.tabledata[i-1+this.homeData.partSize].editorType]+"_"+this.tabledata[i-1+this.homeData.partSize].stepname;
            mapping = this.tabledata[i-1+this.homeData.partSize].stepname+":{\""+this.tool_type[this.tabledata[i-1+this.homeData.partSize].editorType]+"_"+this.tabledata[i-1+this.homeData.partSize].stepname+"\"}";
            this.main_editor_array.push(editor);
            anspro_mapping.push(mapping);
            this.editorModule.push(this.tabledata[i-1+this.homeData.partSize].stepname);
            this.countDDm.push(this.tabledata[i-1+this.homeData.partSize].totalDDM)
            this.countEditor.push(this.tabledata[i-1+this.homeData.partSize].totalEB)
            this.toolType.push(this.tool_type[this.tabledata[i-1+this.homeData.partSize].editorType])
        }
    }
    const final_mapping = "<return value=#{"+anspro_mapping.join(',').toString()+"}>";
    return final_mapping;
  }

  getAnsproRule() {
    let rulename = [];
    this.tabledata.forEach((row, index) => {
      if (row.features && row.features.includes("letters")) {
        if (row.buttons && row.buttons.includes("list")) {
          rulename.push("list2");
        } else {
          rulename.push("polynom2");
        }
      } else {
        if (row.buttons && row.buttons.includes("list")) {
          rulename.push("list2");
        } else {
          rulename.push("arith2");
        }
      }
    })
    console.log(rulename)
    return rulename;
  }

  getAnsproCatches() {
    let catches = [];
    this.tabledata.forEach((row, index) => {
      let catchelines=``;
      if (row.features && row.features.includes("letters")) {
        catchelines=`
            <catch name=value.*>
            <catch name=value.TooManyVariables redirect={value.MismatchVariables}>`
      }

      if (row.buttons && row.buttons.includes("pow") && (row.buttons.includes("div") || row.buttons.includes("mixednb"))) {
        catchelines+=`
            &(@userFeedback.fracSimplifyDivByOne(););
            <catch cond=("@itemAnspro.checkCatch(reduce,NegativeInExp);"=="1" && "@itemAnspro.getCurrentFeedbackField('value');" == "Correct") redirect={value.NegExpNotAllowed}>
            <catch cond=("@itemAnspro.checkCatch(convention,MixedNumberMismatch);"=="1" && "@itemAnspro.getCurrentFeedbackField('value');" == "Correct") redirect={reduce.ImproperMixedFraction}>`;
      } else if (row.buttons && row.buttons.includes("list") && (row.buttons.includes("div") || row.buttons.includes("mixednb"))) {
        catchelines+=`${!row.features?'':'${row.features.includes("letters")?"":"<catch name=value.*>"}'}
            <catch name={value.WrongOrder} redirect={value.Correct}>
            &(@userFeedback.fracSimplifyDivByOne(););
            <catch cond=(@itemAnspro.checkCatch(convention,MixedNumberMismatch);==1 && "@itemAnspro.getCurrentFeedbackField('value');" == "Correct") redirect={reduce.ImproperMixedFraction}>`;
      } else if (row.buttons && row.buttons.includes("list") && row.features) {
        catchelines+=`${!row.features?'':'${row.features.includes("letters")?"":"<catch name=value.*>"}'}
            <catch name={value.WrongOrder} redirect={value.Correct}>
            &(@userFeedback.fracSimplifyDivByOne(););`;
      } 
      else if (row.buttons && row.buttons.includes("list") && !row.features) {
        catchelines+=`${!row.features?'':'${row.features.includes("letters")?"":"<catch name=value.*>"}'}
            <catch name={value.WrongOrder} redirect={value.Correct}>
            &(@userFeedback.fracSimplifyDivByOne(););`;
      } else if (row.buttons && (row.buttons.includes("div") || row.buttons.includes("mixednb"))) {
        catchelines+=`
            &(@userFeedback.fracSimplifyDivByOne(););
            <catch cond=("@itemAnspro.checkCatch(convention,MixedNumberMismatch);"=="1" && "@itemAnspro.getCurrentFeedbackField('value');" == "Correct") redirect={reduce.ImproperMixedFraction}>`;
      } else if (row.buttons && row.buttons.includes("pow")) {
        catchelines+=`
            &(@userFeedback.fracSimplifyDivByOne(););
            <catch cond=("@itemAnspro.checkCatch(reduce,NegativeInExp);"=="1" && "@itemAnspro.getCurrentFeedbackField('value');" == "Correct") redirect={value.NegExpNotAllowed}>`
      } else {
        catchelines+=`&(@userFeedback.fracSimplifyDivByOne(););`;
      }
      catches.push(catchelines);
    })
    console.log(catches)
    return catches;
  }

  generateEvaluations(rulename,catches) {
    let evaluationBlocks = [];
    let rule_type;
    for(let i=1; i<=this.main_editor_array.length; i++) {
        var num= this.countEditor[i-1]+this.countDDm[i-1];
        var count_editbox= this.countEditor[i-1];
        var count_ddm= this.countDDm[i-1];
        let commentHeader = "<!-- *************************************** Answer processing of " + this.editorModule[i - 1] + " *************************************** -->";
        let evaluationHead = "<function name=anspro_"+ this.main_editor_array[i-1]+" list={studentAnswer,teacherAnswer}>";
        let evaluationLoopModel=``;
        let initDDM=1;
        let limit_DDM=this.countDDm[i-1];

        if(this.toolType[i-1]=="formed"){
            evaluationLoopModel+=this.splitStudentAnswer(count_editbox,count_ddm);
            if(this.countEditor[i-1]>0){
                if(count_editbox==1){
                    evaluationLoopModel+=this.addSingleEditbox(i-1,count_ddm,rulename[i-1],catches[i-1]);
                }
                else{
                    evaluationLoopModel+=this.addSeparateApEditbox(i-1,rulename[i-1],catches[i-1]);
                }
            initDDM = 1+ this.countEditor[i - 1] ;
            limit_DDM = limit_DDM + this.countEditor[i-1];
            }
            if(this.countDDm[i-1]>0){
                if(this.countDDm[i-1]==1){
            evaluationLoopModel+=`
        <evaluation rule=choice student="@('.student_ans_returned_`+this.editorModule[i-1]+`_`+initDDM+`')" teacher="@('.teacher_ans_returned_`+this.editorModule[i-1]+`_`+initDDM+`')">
        <feedback>
        </feedback>`;
            if(this.countEditor[i-1]>0){
            if(initDDM>9){
                evaluationLoopModel+=`
        &(@itemAnspro.storeFeedback("` + this.editorModule[i - 1] + `.`+initDDM+`"))
        &(@itemAnspro.registerFeedback("` + this.editorModule[i - 1] + `.`+initDDM+`"))`;
            }
            else{
            evaluationLoopModel+=`
        &(@itemAnspro.storeFeedback("` + this.editorModule[i - 1] + `.0`+initDDM+`"))
        &(@itemAnspro.registerFeedback("` + this.editorModule[i - 1] + `.0`+initDDM+`"))`;
            }
            }
                }
                else if(!this.tabledata[i-1].separateDDMAP){
                    evaluationLoopModel+=this.addSameApDdm(i-1,initDDM);
                }
                else{
                    evaluationLoopModel+=this.addSeparateApDdm(i-1,initDDM);
                }
            }
        }
        if(this.toolType[i-1]=="figed"){
            evaluationLoopModel+=`
      <evaluation rule=figed  student="@studentAnswer;" teacher="@teacherAnswer;">
      <feedback>
        <catch name=value.*>
        <catch name=system.*>
      </feedback>`;
        }
        if(this.toolType[i-1]=="tabed"){
            evaluationLoopModel+=`
      &(@multiFeedback.splitAnswer3("student_answer","@userf.removeSet1("@studentAnswer;");"));
      &(@multiFeedback.splitAnswer3("teacher_answer","@userf.removeSet1("@teacherAnswer;");"));`;
            if(this.countEditor[i-1]>0){
                evaluationLoopModel+=this.splitStudentAnswer(count_editbox,count_ddm);
            }
                evaluationLoopModel+=`
      <evaluation rule=rule_type  student="@student_answer1;" teacher="@teacher_answer1;">
      <feedback></feedback>`;
        }
        let evaluationModel = `
    ${commentHeader}
    ${evaluationHead}${evaluationLoopModel}
    </function>
        `;
        evaluationBlocks.push(evaluationModel);
    }
    return evaluationBlocks.join("");
  }

  //Depending on the input type the split answer function will be choosen.
  //Input: count of editbox,count of DDM
  //Output: string of splliting the student and teacher answer.
  splitStudentAnswer(count_editbox,count_ddm) {
      let splitAnswerModel=``;
      // Adds for editbox;
      if(count_editbox>0) {
          splitAnswerModel+=`
        &(@multiFeedback.splitAnswerEditBox("student_answer","@studentAnswer;"));
        &(@multiFeedback.splitAnswerEditBox("teacher_answer","@teacherAnswer;"));
          `;
      }
      //Adds for DDM/radiobuttons
      if(count_ddm>0) {
          splitAnswerModel+=`
        &(@userf.splitReturnValueByName("@studentAnswer;",".student_"));
        &(@userf.splitReturnValueByName("@teacherAnswer;",".teacher_"));
          `;
      }
      return splitAnswerModel;
  }

  //Adds AP for with same rule and catches to all editbox objects.
  //Input:
  //Output:
  addSingleEditbox(module_index,count_ddm,rulename,catches) {
      var module_name= this.editorModule[module_index];
      let singleEditboxModel=``;
      singleEditboxModel+=`
        <evaluation rule=`+rulename+` teacher="@teacher_answer1;" student="@student_answer1;">
          <feedback>
              `+catches+`
          </feedback>`;

          if(count_ddm>0){
              singleEditboxModel+=`
            &(@itemAnspro.storeFeedback("`+module_name+`.01"););
            &(@itemAnspro.registerFeedback("`+module_name+`.01"));
            `;
          }
        return singleEditboxModel;
  }

  addSeparateApEditbox(module_index,rulename,catches){
      var module_name= this.editorModule[module_index];
      var number_editbox= this.countEditor[module_index];
      var count_ddm= this.countDDm[module_index];
      let diffAnswerModel=``;

        for(let j=1;j<=number_editbox;j++){
          diffAnswerModel+=`
          <evaluation rule=`+rulename+` student="@student_answer`+j+`" teacher="@teacher_answer`+j+`">
          <feedback>
              `+catches+`
          </feedback>`;
      if(!(number_editbox==1 && this.countDDm==0)) {
          if(j<10){
              diffAnswerModel+=`
          &(@itemAnspro.storeFeedback("`+module_name+`.0`+j+`"))
          &(@itemAnspro.registerFeedback("`+module_name+`.0`+j+`"))
      `;
      }
      else{
          diffAnswerModel+=`
          &(@itemAnspro.storeFeedback("`+module_name+`.`+j+`"))
          &(@itemAnspro.registerFeedback("`+module_name+`.`+j+`"))
              `;
              }
          }
      }
      return diffAnswerModel;
  }

  addSameApEditbox(module_index,rulename,catches) {
    var module_name= this.editorModule[module_index];
    var number_editbox= this.countEditor[module_index];
    let sameAnswerModel=``;
    sameAnswerModel+=`
      <for name=i value=1 cond=(@i;<=`+number_editbox+`) next=(@i;+1)>
        <evaluation rule=`+rulename+` teacher="@('teacher_answer@i;');" student="@('student_answer@i;');">
        <feedback>
          `+catches+`
        </feedback>
        <if cond=(@i;>9)>
          &(@itemAnspro.storeFeedback("`+module_name+`.@i;"););
          &(@itemAnspro.registerFeedback("`+module_name+`.@i;"));
        <else>
          &(@itemAnspro.storeFeedback("`+module_name+`.0@i;"););
          &(@itemAnspro.registerFeedback("`+module_name+`.0@i;"));
        </if>
      </for>`
      return sameAnswerModel;
  }

  addSameApDdm(module_index,ddm_start_index){
      var module_name= this.editorModule[module_index];
      var count_ddm= this.countDDm[module_index];
      var number_editors= this.countEditor[module_index]+count_ddm;
      let sameDdmModel=``;

      sameDdmModel+=`
      <for name=j value=`+ddm_start_index+` cond=(@j;<=`+number_editors+`) next=(@j;+1)>
      <evaluation rule=choice student="@('.student_ans_returned_`+module_name+`_@j;')" teacher="@('.teacher_ans_returned_`+module_name+`_@j;')">
      <feedback>
      </feedback>
      <if cond=(@j;<10)>
          &(@itemAnspro.storeFeedback("` + module_name + `.0@j;"))
          &(@itemAnspro.registerFeedback("` + module_name + `.0@j;"))
      <else>
          &(@itemAnspro.storeFeedback("` + module_name + `.@j;"))
          &(@itemAnspro.registerFeedback("` + module_name + `.@j;"))
      </if>
      </for>`;
      return sameDdmModel;
  }

  addSeparateApDdm(module_index,ddm_start_index){
    var module_name= this.editorModule[module_index];
    var count_ddm= this.countDDm[module_index];
    var number_editors= this.countEditor[module_index]+count_ddm;
    let diffDdmModel=``;

    for (let j=ddm_start_index; j<=number_editors; j++){
        diffDdmModel+=`
        <evaluation rule=choice student="@.student_ans_returned_`+module_name+`_`+j+`;" teacher="@.teacher_ans_returned_`+module_name+`_`+j+`;">
        <feedback>
        </feedback>`;
        if (j<10){
        diffDdmModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.0`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.0`+j+`"))
        `;
        }
        else{
        diffDdmModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.`+j+`"))
        `;
          }
    }
    return diffDdmModel;
  }

  generateTeacherModule() {
    this.teacherModule = [];
    let singleTeacherModule;
      for(let i=1; i<=this.main_editor_array.length; i++) {
        let teacherAnswer=``;
        var num= this.countEditor[i-1]+this.countDDm[i-1];
        if(this.main_editor_array[i-1].split("_", 1)=="formed"){
            for(let j=1; j<=num; j++) {
                if(j<=this.countEditor[i-1]){
                    teacherAnswer+=`[ans_returned_`+this.editorModule[i-1]+`_`+j+`]=[\\\\editbox;[]];`;
                }
                else{
                    teacherAnswer+=`[ans_returned_`+this.editorModule[i-1]+`_`+j+`]=[];`;
                }

            }
        }
        if(this.main_editor_array[i-1].split("_", 1)=="tabed"){
            teacherAnswer+=`\\\\set1;[`;
          for(let j=1; j<=num; j++) {
                if(j<=this.countEditor[i-1]){
                    teacherAnswer+=`[\\\\editbox;[]];`;
                }
                else{
                    teacherAnswer+=`[];`;
                }
            }
            teacherAnswer+=`]`;
        }
        this.ans_editor.push(teacherAnswer);
        singleTeacherModule = `
        <var name=teacherAnswerHash[\"${this.main_editor_array[i-1]}\"] cond=(\"@partRequested;\" == \"${this.editorModule[i-1]}\") value=\"@ans_`+this.editorModule[i-1]+`;\">`

        this.teacherModule.push(singleTeacherModule);
    }
    return this.teacherModule.join("");
  }

  generateTeacherSimple(){
      let totalCount = this.editorModule.length;
      let simpleTeacher=``;
      let simpleTeacherArray=[];
      for(let i=1;i<=totalCount;i++){
          simpleTeacher = `
          <var name=ans_${this.editorModule[i-1]} value=\"${this.ans_editor[i-1]}\">`
          simpleTeacherArray.push(simpleTeacher);
      }
      return simpleTeacherArray.join("");;
  }

  generateTries(){
    let createData=false;
    let tries_info={};
    let tries_return=``;
    this.tabledata.forEach(function (data){
    if(data.stepname.charAt(0)=="I" && data.tries<3 && data.tries>0){
        let id=data.stepname;
        createData=true;
        tries_info[id]=data.tries;
    }
    });
    if(createData){
      tries_return=`
      <function name=StatementStepsTries list={}>
          <return value=#`+JSON.stringify(tries_info)+`>
      </function>
      `;
   }
   return tries_return;
  }

  generateStepLabel(){
    let createData=false;
    let step_info={};
    let step_return=``;
    this.tabledata.forEach(function (data){
    if(data.stepname.charAt(0)=="G" && data.stepLabel){
        let id=data.stepname;
        createData=true;
        step_info[id]="";
    }
     });
    if(createData){
      step_return=`
      <function name=ResolutionStepsTitles list={}>
          <return value=#`+JSON.stringify(step_info)+`>
      </function>
      `;
    }
    return step_return;
  }

  generateHTMLTeacherModule() {
    let teacherHTMLModule = [];
    let singleTeacherHTMLModule;
    for(let i=1; i<=this.main_editor_array.length; i++) {
        singleTeacherHTMLModule = `
        <var name=teacherAnswerHTML cond=(\"@partRequested;\" == \"${this.editorModule[i-1]}\") value=\"&(text())\">`

        teacherHTMLModule.push(singleTeacherHTMLModule);
    }
    return teacherHTMLModule.join("");
  }

  generateHTMLTeacherModuleWithFA() {
    let teacherHTMLModule = [];
    let toolMode="display";
    let singleTeacherHTMLModule;
    let editext;
    for(let i=1,j=1; i<=this.main_editor_array.length; i++,j++) {
        while(this.tabledata[j-1].static == true){
            j++;
        }
        editext=this.tabledata[j-1].edit_html;

        if(this.tabledata[j-1].editorType =="2"){
            let mediaList=this.mediaListGenerator(j-1);
            singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${this.editorModule[i-1]}\")>
            <var name=`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+this.tool_type[this.tabledata[j-1].editorType]+`','`+this.tool_type[this.tabledata[j-1].editorType]+`_`+this.editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(),mediaList:{`+mediaList+`},fillAnswer:"@ans_`+this.editorModule[i-1]+`;"});>
            <var name=teacherAnswerHTML value=\"@`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA;\">
        </if>`
        }
        else if(this.tabledata[j-1].editorType =="1"){
        singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${this.editorModule[i-1]}\")>
            <var name=`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+this.tool_type[this.tabledata[j-1].editorType]+`','`+this.tool_type[this.tabledata[j-1].editorType]+`_`+this.editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(${editext}),fillAnswer:"@ans_`+this.editorModule[i-1]+`;"});>
            <var name=teacherAnswerHTML value=\"@`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA;\">
        </if>`
        }
        else{
            singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${this.editorModule[i-1]}\")>
            <var name=`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+this.tool_type[this.tabledata[j-1].editorType]+`','`+this.tool_type[this.tabledata[j-1].editorType]+`_`+this.editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(),height:350,width:350});>
            <var name=teacherAnswerHTML value=\"@`+this.tool_type[this.tabledata[j-1].editorType]+`_`+toolMode+`_`+this.editorModule[i-1]+`_TA;\">
        </if>`
        }
        teacherHTMLModule.push(singleTeacherHTMLModule);
    }
    return teacherHTMLModule.join("");
  }

  getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label, splitcodeArray, splitInstanceblock, adaLines,customFunction) {
    var explaination=this.ShowMeTexts.join("");
    var isl_code = `
  <def>
    ${(splitcodeArray.length) ? splitcodeArray[0] : ''}
    ${customFunction}
  </def>

  <description>
    <label name=level value={}>
    <label name=curriculum value={}>
    <label name=under value={}>
    <label name=thesaurus value={}>
  </description>

  <ITEM TITLE="@Title">${splitInstanceblock}
    <INSTANCE>
    </INSTANCE>
    <REQUIREMENT>
    </REQUIREMENT>

    <!-- *************************************** Sequence Block ***************************************-->
    <var name=item_instance_values value={}>
    <SEQUENCE INDEX=history>
        <SIGNATURE NAME=@autoSequenceSignatureName() VALUE="@formatAutoSequenceSignature(@item_instance_values;)">
        ${(splitcodeArray.length) ? splitcodeArray[1] : ''}
    </SEQUENCE>

    <REQUIREMENT>
        <REQUIRES COND=@testAutoSequenceRequirement(@item_instance_values;)>
        ${(splitcodeArray.length) ? splitcodeArray[2] : ''}
    </REQUIREMENT>

    <QUESTION>
      <function name=TrunkModule list={}>
        <def module=".">
          <var name=varEqualTo value=@userf.disp("=")>
          <var name=iBeg value="@userf.indent_begin();">
          <var name=iEnd value="@userf.indent_end();">
          <var name=table_width value=45>
          <var name=table_height value=25>
          ${adaLines}
          ${this.table_structure}
          ${ans_teacher}
          ${this.object_reference.join("")}
        </def>
      </function>

      <function name=StatementSteps list={}>
        ${statementModuleReturnValues}
      </function>
      ${no_of_tries}
      <function name=StatementModule list={}>
        <def module=".">

          <!-- *************************************** Main Question ***************************************-->
          <function name=StatementModule_Main list={modeRequested}>
            <TEXT REF=STATEMENT>
              <p>%Qn;</p>
              &(("@modeRequested;"=="static" || "@modeRequested;"=="pdf") ? "" : "")
            </TEXT>
            <return value="STATEMENT">
          </function>
          ${statementSteps}
        </def>
      </function>

      <function name=ResolutionSteps list={}>
        ${resolutionModuleReturnValues}
      </function>
          ${has_step_label}
      <function name=ResolutionModule list={partsRequested}>
        <def module=".">

          <!-- *************************************** Show Me ***************************************-->
          <function name=ResolutionModule_Main list={modeRequested}>
            <TEXT REF=RESOLUTION>${explaination}
            </TEXT>
            <return value="RESOLUTION">
          </function>

          ${resolutionSteps}
        </def>
      </function>

      <function name=AnsproModule list={}>
        ${ansproMapping}
      </function>

      <function name=TeacherModule list={partRequested,mode}>
        &(teacherAnswerHash=#{};;);${teacherModule}
        <return value=@teacherAnswerHash>
      </function>

      <function name=HtmlTeacherModule list={partRequested}>
        <var name=table_width value=0>
        <var name=table_height value=0>
        <var name=iBeg value="">
        <var name=iEnd value="">
        <unvar name=teacherAnswerHTML>${teacherHTMLModule}
        <return value="@teacherAnswerHTML">
      </function>

    </QUESTION>
  ${evaluationBlocks}
  </ITEM>
      `
      return isl_code;
  }

  //with fillAnswer
  getISLCodeWithFA(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label,adaLines,customFunction) {
    var explaination=this.ShowMeTexts.join("");
    var isl_code = `
  <def>
    ${customFunction}
  </def>

  <description>
    <label name=level value={}>
    <label name=curriculum value={}>
    <label name=under value={}>
    <label name=thesaurus value={}>
  </description>

  <ITEM TITLE="@Title">
    <INSTANCE>
    </INSTANCE>
    <REQUIREMENT>
    </REQUIREMENT>

    <!-- *************************************** Sequence Block ***************************************-->
    <var name=item_instance_values value={}>
    <SEQUENCE INDEX=history>
        <SIGNATURE NAME=@autoSequenceSignatureName() VALUE="@formatAutoSequenceSignature(@item_instance_values;)">
    </SEQUENCE>

    <REQUIREMENT>
        <REQUIRES COND=@testAutoSequenceRequirement(@item_instance_values;)>
    </REQUIREMENT>

    <QUESTION>
      <function name=TrunkModule list={}>
        <def module=".">
          <var name=varEqualTo value=@userf.disp("=")>
          <var name=iBeg value="@userf.indent_begin();">
          <var name=iEnd value="@userf.indent_end();">
          <var name=table_width value=45>
          <var name=table_height value=25>
          ${adaLines}
          ${this.object_reference_editor.join("")}
          ${ans_teacher}
          ${this.table_structure}
        </def>
      </function>

      <function name=StatementSteps list={}>
        ${statementModuleReturnValues}
      </function>
      ${no_of_tries}
      <function name=StatementModule list={}>
        <def module=".">

          <!-- *************************************** Main Question ***************************************-->
          <function name=StatementModule_Main list={modeRequested}>
            <TEXT REF=STATEMENT>
            <p>%Qn;</p>
            </TEXT>
            <return value="STATEMENT">
          </function>
          ${statementSteps}
        </def>
      </function>

      <function name=ResolutionSteps list={}>
        ${resolutionModuleReturnValues}
      </function>
          ${has_step_label}
      <function name=ResolutionModule list={partsRequested}>
        <def module=".">

          <!-- *************************************** Show Me ***************************************-->
          <function name=ResolutionModule_Main list={modeRequested}>
            ${this.object_reference.join("")}

            <TEXT REF=RESOLUTION>${explaination}
            </TEXT>
            <return value="RESOLUTION">
          </function>

          ${resolutionSteps}
        </def>
      </function>

      <function name=AnsproModule list={}>
        ${ansproMapping}
      </function>

      <function name=TeacherModule list={partRequested,mode}>
        &(teacherAnswerHash=#{};;);${teacherModule}
        <return value=@teacherAnswerHash>
      </function>

      <function name=HtmlTeacherModule list={partRequested}>
        <var name=table_width value=0>
        <var name=table_height value=0>
        <var name=iBeg value="">
        <var name=iEnd value="">
        <unvar name=teacherAnswerHTML>${teacherHTMLModule}
        <return value="@teacherAnswerHTML">
      </function>

    </QUESTION>
  ${evaluationBlocks}
  </ITEM>
      `
      return isl_code;
  }

  getENGLISHCode() {
    let line=false;
    let english_code = `
    <def>

      <text ref=Qn></text>

    `
    for(let j=0; j<this.englishFileTexts.length; j++) {
            var str=this.englishFileTexts[j].split("\n");
            line=false;
            for(let k=0; k<str.length; k++) {
                if(str[k]!="" && str[k].includes("</p>"))
                {
                    line=true;
                    var mySubString = str[k].substring(
                        str[k].lastIndexOf("%") + 1,
                        str[k].lastIndexOf(";")
                    );
                    english_code+=`  <text ref=${mySubString}></text>
    `
                    }
        }
        english_code+= (line) ? `
    ` : ``;
    }
        english_code+= `</def>
    `
  return english_code;
  }
}
