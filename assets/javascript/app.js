$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', triva.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
})
//Should have start button.

//There will be 6 questions and 6 answers.

var trivia = {
    correct: 0,
    incorrect: 0, 
    unanswered: 0,
    currentSet: 0, 
    timer: 20,
    timerOn: false,
    timerId: '',
    
    questions: {
        q1: 'What is Batmans real name?',
        q2: 'Who took the mantel of The Flash after Barry Allen?(pre-52)',
        q3: 'Who was the second person to become Ronin?',
        q4: 'Who was the leader of the Teen-Titans(Pre-52)?',
        q5: 'Slade Wilson is known to be a anti-villain, what is his alter ego?',
    }, 
    options: {
        q1:['Barbara Wayne','Thomas Wayne', 'Bruce Wayne'],
        q2:['Wally West', 'Bart Allen', 'Don Allen'],
        q3:['Maya Lopez', 'Clint Barton', 'Eric Brooks'],
        q4:['Robin', 'Speedy', 'Guardian'],
        q5:['Arsenal', 'Red Hood', 'Deathstroke'],
    },
    answers: {
        q1: 'Bruce Wayne',
        q2: 'Wally West',
        q3: 'Clint Barton',
        q4: 'Robin',
        q5: 'Deathstroke'
        
    },

    startGame: function(){
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();
    },

    nextQuestion : function(){

        trivia.timer = 20;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class= option btn btn-info btn lg">' + key + '</button>'));
        })
    },

    timerRunning : function(){
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
          $('#timer').text(trivia.timer);
          trivia.timer--;
            if(trivia.timer === 4){
              $('#timer').addClass('last-seconds');
            }
        }
        else if (trivia.timer === -1){
            trivia.unanswered ++;
            trivia.result = false;
            clearInterval(trivia.Id);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] + '</h3>'); 
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length){
            $('#results')
                .html('<h3> Thank you for playing!</h3>' +
                '<p>Correct: '+ trivia.correct +'</p>'+
                '<p>Incorrect: '+ trivia.incorrect +'</p>'+
                '<p>Unanswered '+ trivia.unanswered + '</p>'+ 
                '<p> Please play again! </p>');
    
            $('#game').hide();
    
            $('#start').show();
        }
    },
    guessChecker : function() {
        var resultId;

        var currentAnswer =Object.values(trivia.answers)[trivia.currentSet];

        if($(this).text() === currentAnswer){
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3');

        }
        else{
            $(this).addClass('btn-wrong').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3> try again!' + currentAnswer + '</h3>');
        }

    },
    guessResult : function(){
        trivia.currentSet++;

        $('option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();
    }

    

    
}
