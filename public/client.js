var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

var voteTally = document.getElementById('vote-tally');
var voteVisualization = document.getElementById('vote-visualization');

socket.on('voteCount', function (votes) {
  voteTally.innerText = 'A: ' + votes['A'] + ' B: ' + votes['B'] + ' C: ' + votes['C'] + ' D: ' + votes['D']
  voteVisualization.innerHTML = 'A: ' + visualizeVotes(votes['A'])
                                + '<br>B: ' + visualizeVotes(votes['B'])
                                + '<br>C: ' + visualizeVotes(votes['C'])
                                + '<br>D: ' + visualizeVotes(votes['D'])
});

function visualizeVotes(count) {
  var visual = '';
  for (var i = 1; i <= count; i++) {
    visual = visual + '|'
  };
  return visual
}

var userVote = document.getElementById('user-vote');

socket.on('userVote', function (vote) {
  userVote.innerText = 'Your vote has been recorded. You selected: ' + vote
});
