function getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label) {
  console.log(englishFileTexts);  var explaination=ShowMeTexts.join("");  
  console.log(englishFileTexts);
  var isl_code = `
<def>

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
        <var name=nlh value="@.newLineHint;">
        <var name=varEqualTo value=@userf.disp("=")>
        <var name=iBeg value="@userf.indent_begin();"> 
        <var name=iEnd value="@userf.indent_end();">
        <var name=table_width value=45> 
        <var name=va value="valign=baseline">
        ${object_reference_editor.join("")}
        ${ans_teacher}
        ${table_structure}
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
          ${object_reference.join("")}
          
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
