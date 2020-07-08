

const getISLCode = (statementStepsList, resolutionStepsList, statementSteps, resolutionSteps, staticSourceList, apModuleList) => {
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
        <var name=table_width value="width=40">
        <var name=nlHint value="@.newLineHint;">
        <var name=xl value="@userf.xlist();">
        <var name=valign_base value="valign=baseline">
        <var name=align_right value='style="text-align:right;"'>
        <var name=align_left value='style="text-align:left;"'>
        <var name=align_center value='style="text-align:center;"'> 

        ${staticSourceList}

      </def> 
    </function>

    <function name=StatementSteps list={}>
      ${statementStepsList}
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
      ${resolutionStepsList}
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
      ${apModuleList}
    </function>
    
    <function name=TeacherModule list={partRequested,mode}>
      &(teacherAnswerHash=#{};;);
      <return value=@teacherAnswerHash>
    </function>

    <function name=HtmlTeacherModule list={partRequested}>
      <unvar name=teacherAnswerHTML>
      <return value="@teacherAnswerHTML">
    </function>
    
  </QUESTION>

</ITEM>
    `
  return isl_code;
}
