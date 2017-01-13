static_path = '.'
canvas = $('<canvas>',
    {
        id: "myCanvas",
        class: ""
    });
buttons = $('<div>',
    {
        id: "buttons",
        class: ""
    });

buttons_list = [
  {
    'id': "myBtn",
    'event': "GameSession.nextLevel()",
    'text': "New",
    'image': "startbutton.png"
  },
  {
    'id': "additionButton",
    'event': "GameSession.switch_sign($(this),'+')",
    'text': "",
    'image': "addition.gif"
  },
  {
    'id': "subtractionButton",
    'event': "GameSession.switch_sign($(this),'-')",
    'text': "",
    'image': "Subtraction.jpg"
  },
  {
    'id': "multiplicationButton",
    'event': "GameSession.switch_sign($(this),'*')",
    'text': "",
    'image': "multiply.png"
  }
]

for (var i in buttons_list) {
    button = $('<button>',
    {
        id: buttons_list[i]['id'],
        class: 'signs',
        onClick: buttons_list[i]['event'],
        text: buttons_list[i]['text']
    });
    button.append(`<img src="${static_path}/images/${buttons_list[i]['image']}"/>`)
    buttons.append(button)
};

$("#content").append(canvas)
$('#myCanvas')[0].width = 400;
$('#myCanvas')[0].height = 400;
$("#content").append(buttons)