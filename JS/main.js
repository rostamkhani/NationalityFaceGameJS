

var game;
var lblScore,lblTrue,lblFalse,lblCount;
var trueSound = new Audio('./Data/Sound/true.mp3');

var scoreValue = 0,trueValue = 0,falseValue = 0,countValue = 0;

$( document ).ready(function() {

    var m = $('#StartGame').modal({closable:false}).modal('show');
    $('#EndGame').hide();
    $('#StartGame').click(function(){
        $('#StartGame').modal('hide');
        game = new NationalityGame(0.9,700,700);
        addEventListener('EndGame',function()
        {
           $('#EndGame').show();
        });
    });

    lblScore = $('#lblScore');
    lblTrue = $('#lblTrue');
    lblFalse = $('#lblFalse');
    lblCount = $('#lblCount');




    
});


interact('.CountryBox').dropzone({
    // only accept elements matching this CSS selector
    accept: '.PeopleItem',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.01,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')

        var draggableElement = event.relatedTarget
        //draggableElement.classList.add('drop-active')
    },

    ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target

        // feedback the possibility of a drop
        
        if($(draggableElement).hasClass("Target")==false)
        {
            game.Stop();
            if(dropzoneElement.getAttribute('NationalityType')==draggableElement.getAttribute('NationalityType'))
            {
                draggableElement.classList.add('PeopleItem_True');
                scoreValue+=20;
                trueValue++;
                trueSound.play();
            }
            else
            {
                draggableElement.classList.add('PeopleItem_False');
                scoreValue-=5;
                falseValue++;
            }
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('Target')
            game.Start();

            lblScore.html(scoreValue);
            lblTrue.html(trueValue);
            lblFalse.html(falseValue);

        }
        //draggableElement.textContent = 'Dragged in'
    },

    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        //event.relatedTarget.textContent = 'Dragged out'
    },

    ondrop: function (event) {
        // event.relatedTarget.textContent = 'Dropped'
    },

    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('drop-active')
    }
})

interact('.PeopleItem')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        listeners: { move: dragMoveListener }
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}