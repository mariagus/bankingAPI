const unsuccessful = () => {
  return {
    success: false,
    message: "failed",
    status: 404,
  };
};
const successful = () => {
  return {
    success: true,
    message: "success",
    status: 200,
  };
};
module.exports.unsuccessful = unsuccessful;
module.exports.successful = successful;
