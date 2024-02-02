{
    function SpaceLayers(thisObj) {
        function SpaceLayers_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SpaceLayers", undefined, {resizeable:true});

            res = "group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                myStaticText: StaticText{text:'Enter time interval:'},\
                myEditText: EditText{text:'1'},\
                myRadioButtonGroup: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                    myRadioButton1: RadioButton{text:'Seconds'},\
                    myRadioButton2: RadioButton{text:'Frames'}\
                },\
                myDirectionGroup: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                    myDirectionButton1: RadioButton{text:'Top to bottom'},\
                    myDirectionButton2: RadioButton{text:'Bottom to top'}\
                },\
                myButton: Button{text:'Apply'}\
            }";

            myPanel.grp = myPanel.add(res);

            myPanel.grp.myRadioButtonGroup.myRadioButton1.value = true;
            myPanel.grp.myDirectionGroup.myDirectionButton1.value = true;

            myPanel.grp.myButton.onClick = function(){
                var interval = parseInt(myPanel.grp.myEditText.text);
                var unit = myPanel.grp.myRadioButtonGroup.myRadioButton1.value ? 'Seconds' : 'Frames';
                var direction = myPanel.grp.myDirectionGroup.myDirectionButton1.value ? 'Top to bottom' : 'Bottom to top';
                var layers = app.project.activeItem.selectedLayers;
                var time = 0;

                if(layers.length == 0) {
                    alert("Error: No layer selected.");
                    return;
                }

                if(unit == 'Seconds') {
                    time = interval;
                } else {
                    time = interval / app.project.activeItem.frameRate;
                }

                app.beginUndoGroup("Move Layers");

                if(direction == 'Top to bottom') {
                    for(var i = 0; i < layers.length; i++) {
                        if(i != 0) {
                            layers[i].startTime = layers[i-1].outPoint + time;
                        }
                    }
                } else {
                    for(var i = layers.length - 1; i >= 0; i--) {
                        if(i != layers.length - 1) {
                            layers[i].startTime = layers[i+1].outPoint + time;
                        }
                    }
                }

                app.endUndoGroup();
            }

            myPanel.layout.layout(true);
            return myPanel;
        }

        var SpaceLayersPal = SpaceLayers_buildUI(thisObj);

        if ((SpaceLayersPal != null) && (SpaceLayersPal instanceof Window)) {
            SpaceLayersPal.center();
            SpaceLayersPal.show();
        }
    }

    SpaceLayers(this);
}
