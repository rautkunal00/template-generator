

const getISLCode = (statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule) => {
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
        <var name=varEqualTo value=@userf.disp("=")>
        <var name=indent_start value="@userf.indent_begin();"> 
        <var name=indent_end value="@userf.indent_end();">
        <var name=table_width value=45> 

        ${object_reference.join("")}
      </def> 
    </function>

    <function name=StatementSteps list={}>
      ${statementModuleReturnValues}
    </function>

    <function name=StatementModule list={}>
      <def module="."> 
      
        <!-- *************************************** Main Question ***************************************-->
        <function name=StatementModule_Main list={modeRequested}>
          <TEXT REF=STATEMENT></TEXT>
          <return value="STATEMENT">
        </function>

        ${statementSteps}  

      </def>
    </function>


    <function name=ResolutionSteps list={}>
      ${resolutionModuleReturnValues}
    </function>

    <function name=ResolutionModule list={partsRequested}>
      <def module=".">

    <!-- *************************************** Show Me ***************************************-->
    <function name=ResolutionModule_Main list={modeRequested}> 
      <TEXT REF=RESOLUTION></TEXT>
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
      <unvar name=teacherAnswerHTML>${teacherHTMLModule}
      <return value="@teacherAnswerHTML">
    </function>
    
  </QUESTION>

${evaluationBlocks}
</ITEM>
    `
  return isl_code;
}
