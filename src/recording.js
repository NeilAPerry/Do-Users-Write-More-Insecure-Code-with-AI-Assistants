const { ipcRenderer } = window.require('electron');

//! double check that audio is working
const startRecording = (id, audio) => {
  const getResolution = `xdpyinfo | awk '/dimensions/{print $2}'`;
  const basePath = '~/Recordings/';
  const path = `${basePath}${id}`;
  let cmd = '';
  if (audio === 'Yes') {
    // eslint-disable-next-line
    cmd = `ffmpeg -f x11grab -y -r 30 -s $(${getResolution}) -i :0.0 ${path}.mpeg </dev/null > /dev/null 2>&1 & ffmpeg -f alsa -i hw:0 -t 30 -b:a 192k -filter:a "volume=10" ${path}.wav </dev/null > /dev/null 2>&1 &`;
    // eslint-disable-next-line
    // cmd = `ffmpeg -f pulse -i alsa_input.pci-0000_02_02.0.analog-stereo -b:a 320k -f x11grab -y -r 30 -s $(${getResolution}) -i :0.0 ${path}`;
  } else {
    cmd = `ffmpeg -f x11grab -y -r 30 -s $(${getResolution}) -i :0.0 ${path}.mpeg </dev/null > /dev/null 2>&1 &`;
  }
  ipcRenderer.send('exec-command', cmd);
};

// stop the screen recording (call killall ffmpeg)
const stopRecording = (id) => {
  const basePath = '~/Recordings/';
  const path = `${basePath}${id}`;
  const cmd1 = 'killall ffmpeg';
  const cmd2 = `ffmpeg -i ${path}.mpeg -i ${path}.wav -c:v copy -c:a aac ${path}.mp4`;
  ipcRenderer.send('exec-command', `${cmd1}; ${cmd2}`);
};

export default {
  startRecording,
  stopRecording,
};
