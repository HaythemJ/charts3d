// Creates the edit/add data dialog box
$( "#div-databox" ).dialog({
            modal: true,
            draggable: false,
            title: "Edit your data",
            dialogClass: 'datadialog',
            disabled: true,
            width:600,
            height:400,
            maxWidth: 800,
            maxHeight: 600,
            resizable:true
        });
        
// Creates export dialog box
$( "#div-exportbox" ).dialog({
            modal: true,
            draggable: false,
            title: "Export your chart",
            dialogClass: 'datadialog',
            disabled: true,
            width:600,
            height:400,
            resizable: false
        });
        
// calls the sheet plugin
$('#datatable').tableSheet({
  initSchema: schema,
  initData: dataValues,
  maxRows: 1,
  exportText: 'Generate Chart',
  exportCall: function(param){
    schema = param.schema;
    dataValues = param.data;
    $( "#div-databox" ).dialog( "close" );
    backColor = $('#colorpick_bc').val();
    valTextColor = $('#colorpick_vt').val();
    pieHeight = parseInt($('#pie_height').val());
    initScene();
    animateScene();
    initLegend($('#div-legend-data'), schema);
    $('#div-legend').children('h4').html($('#charttitle').val());
  }
});

// sets the thickness param if initiated
if( pieHeight ) $('#pie_height').val(pieHeight.toString()); 

// link to open add/edit data dialog again
$( "#link-edit" ).click(function(){
  $( "#div-databox" ).dialog( "open" );
  return false;
});

// link to open the export box
$( "#link-export" ).click(function(){
  $( "#div-exportbox" ).dialog( "open" );
  return false;
});

// link to close the export box
$( "#link-export-close" ).click(function(){
  $( "#div-exportbox" ).dialog( "close" );
  return false;
});


// link to export the chart as image
$('div#link-export-image').click(function(){
  animateScene();
  var canvasData = renderer.domElement.toDataURL();
  $.ajax({
      type: "POST",
      url: "exporters/export_image.php?h="+window.innerHeight+
            "&w="+window.innerWidth+"&c="+backColor,
      data: canvasData,
      contentType: "application/upload; charset=utf-8",
      success: function(data){
        $('div#result-export-image').html(data);
      }
  });
});

// Color pickers for the backround and text colours
$('#colorpick_bc').colorpicker({
    parts: ['swatches'],
    showOn: 'button',
    showCloseButton: true,
    buttonColorize: true,
    showNoneButton: false,
    alpha: true,
    buttonImage: 'css/images/ui-colorpicker.png',
});

$('#colorpick_vt').colorpicker({
    parts: ['swatches'],
    showOn: 'button',
    showCloseButton: true,
    buttonColorize: true,
    showNoneButton: false,
    alpha: true,
    buttonImage: 'css/images/ui-colorpicker.png',
});
$('#colorpick_bc').hide();
$('#colorpick_vt').hide();

// Closes the export dialog at the begining
$( "#div-exportbox" ).dialog( "close" );