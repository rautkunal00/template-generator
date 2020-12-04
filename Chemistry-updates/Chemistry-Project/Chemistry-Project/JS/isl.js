

const getISLCode = (statementStepsList, resolutionStepsList, statementSteps, resolutionSteps, staticSourceList, triesModule, apModuleList, extraTeacher, teacherAnswer, teacherHTML, finalAP, intermidiateFunction, intermidiateValueFunction, generateNumListFunction, stikeMathFunction, getMantissaExponentFunction) => {
  var isl_code = `<def>
  <include module=userfChemistry>
  ${intermidiateFunction}${intermidiateValueFunction}${generateNumListFunction}${stikeMathFunction}${getMantissaExponentFunction}
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
      
        <var name=s_r value="align=right">
        <var name=s_c value="align=center">
        <var name=v_base value='valign=baseline'>
        <var name=bi value="@userf.indent_begin();">
        <var name=ei value="@userf.indent_end();">
        <var name=nlh value="@.newLineHint;">
        <var name=sil value="@.adaSilenceText;">
        <var name=xl value="@userf.xlist();">
        <var name=eql value='<math>=</math>'>

        ${staticSourceList}

        <text ref=table1>
          <table role="presentation">
            <tr>
              <td @v_base; @s_r;></td>
              <td @v_base; @s_c;>@eql;</td>
              <td @v_base;></td>
            </tr>
          </table>
        </text>

      </def> 
    </function>

    <function name=StatementSteps list={}>
      ${statementStepsList}
    </function>
    ${triesModule}
    <function name=StatementModule list={}>
      <def module="."> 
      
        <!-- *************************************** Main Question ***************************************-->
        <function name=StatementModule_Main list={modeRequested}>
          <TEXT REF=STATEMENT>
          
          </TEXT>
          <return value="STATEMENT">
        </function>
        ${statementSteps}
      </def>
    </function>


    <function name=ResolutionSteps list={}>
      ${resolutionStepsList}
    </function>

    <function name=ResolutionModule list={partsRequested}>
      <def module=".">

        <!-- *************************************** Show Me ***************************************-->
        <function name=ResolutionModule_Main list={modeRequested}> 
          <TEXT REF=RESOLUTION>
          
          </TEXT>
          <return value="RESOLUTION">
        </function>
        ${resolutionSteps}
      </def>
    </function>


    <function name=AnsproModule list={}>
      ${apModuleList}
    </function>
    
    <function name=TeacherModule list={partRequested,mode}>
      ${extraTeacher}
      &(teacherAnswerHash=#{};;);${teacherAnswer}
      <return value=@teacherAnswerHash>
    </function>

    <function name=HtmlTeacherModule list={partRequested}>
      <unvar name=teacherAnswerHTML>${teacherHTML}
      <return value="@teacherAnswerHTML">
    </function>

    <function name=HintModule list={}>
      <return value=text(Hint)>
    </function>
    
  </QUESTION>
  ${finalAP}
</ITEM>
    `
  return isl_code;
}
