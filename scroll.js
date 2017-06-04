// Animation for scrolling
function scrollNav(id){
  $('html,body').animate({scrollTop: $(""+id).offset().top},'slow');
}

// Next Scroll Bar
$(function() {
  function scroll(direction) {
    var scroll, i,
    positions = [],
    here = $(window).scrollTop(),
    collection = $('.slide');
    console.log(collection);

    collection.each(function() {
      positions.push(parseInt($(this).offset()['top'],10));
    });

    for(i = 0; i < positions.length; i++) {
      if (direction == 'next' && positions[i] > here) { scroll = collection.get(i); break; }
      if (direction == 'prev' && i > 0 && positions[i] >= here) { scroll = collection.get(i-1); break; }
    }

    if (scroll) {
      $.scrollTo(scroll, {
        duration: 750
      });
    }
    return false;
  }

  $("#next,#prev").click(function() {
    return scroll($(this).attr('id'));
  });

  $(".scrolltoanchor").click(function() {
    $.scrollTo($($(this).attr("href")), {
      duration: 750
    });
    return false;
  });
});

$('#rsvp-now').submit(function rsvp(form) {
  var params = {
    AccountId: "095700778269",
    RoleArn: "arn:aws:iam::095700778269:policy/ycysunauthpolicy",
    IdentityPoolId: "us-west-2:496d1ed7-ba77-4922-ac01-880558f53e35"
  }

  console.log(form);

  // set the Amazon Cognito region
  AWS.config.region = 'us-west-2';
  // initialize the Credentials object with our parameters
  AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);

  var invitee = document.getElementById('invitee');
  var plusone = document.getElementById('plusone');
  var dietary_restrictions = document.getElementById('dietary_restrictions');

  function invokeLambda( e ){
    var lambda = new AWS.Lambda();

    e.preventDefault();

    lambda.invoke({
      FunctionName: 'ycyswedding2018',
      Payload: JSON.stringify({
        invitee: invitee.value,
        plusone: plusone.value,
        dietary_restrictions: dietary_restrictions.value
      })
    }, function(err, data){
      if(err) console.log(err);
    });
  };

  return false;
});
