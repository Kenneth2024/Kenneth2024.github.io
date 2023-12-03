let fetchedVideoData;
let fetchedVideoDetails;

exports.getVideoList = (req, res) => {
    const video =0;
    res.render('video/videoList', {video});
};

exports.getVideoDetail = (req, res) => {
    // Fetch video data, including the YouTube link, based on the ID
    const video = 0;
    res.render('video/videoDetail', { video });
  };
