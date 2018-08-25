module.exports = ({ body }) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please anwser the following question:</p>
          <p>${body}</p>
          <div>
            <a href="http://localhost:3000">Yes</a>
            <a href="http://localhost:3000">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
