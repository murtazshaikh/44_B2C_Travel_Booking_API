// pages/api/hello.js
export default function handler(req, res) {
  console.log("HELLO endpoint hit!");
  res.status(200).json({ message: 'It works' });
}
