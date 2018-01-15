const formatDate = (date) => {
  let splitDate = date.split('T')[0];
  splitDate = splitDate.split('-');
  const reshuffle = splitDate[2] +"-"+ splitDate[1] + "-"+ splitDate[0];
  return reshuffle;
}
module.exports = formatDate;
