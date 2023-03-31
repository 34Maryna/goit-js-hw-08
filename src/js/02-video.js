import throttle from 'lodash.throttle';
import player from '@vimeo/player';

const VCT_KEY = 'videoplayer-current-time';

const onPlay = function(event) {
localStorage.setItem(VCT_KEY, event.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

messageOut();

function messageOut() {
  const savedTime = localStorage.getItem(VCT_KEY);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}