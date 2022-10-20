export default async function (req, res) {
  return res
    .status(200)
    .json({process_env: JSON.stringify(process.env.ENV)});
}
