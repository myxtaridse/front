export const getPhotoFromState = (posts, photoId) => {
  const post = posts.find((elem) => elem.id === photoId);
  //console.log(photo);
  return {
    ...post,
    // comments: [...photo.comments],
  };
};
