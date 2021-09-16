let {$, alertify} = window

export default function $prompt(title, initialValue = "", validation = {}, check, type = "text") {
  let { maxLength, required, textarea, message } = validation;
  if (!message) message = ""
  let dialog;
  return new Promise((resolve) => {
      let content = $(`<form>
      ${message && `<p class="prompt-message">${message}</p>`}
      ${(textarea) ? (`<textarea style="min-height:165px;resize:vertical;width: calc(100% - 1px);" ${maxLength ? `maxlength="${maxLength}"` : ''} class="form-control textArea">${initialValue}</textarea>`) :
              (`<input type="${type}" ${maxLength ? `maxlength="${maxLength}"` : ''} autofocus class="form-control textArea" value="${initialValue}" />`)}
    </form>`)
      // content.find('.textArea').select()
      content.submit(() => {
          submit(dialog)
          return false;
      })

      function submit(dialog) {
          let val = content.find('.textArea').val().trim()
          if (maxLength && val.length > maxLength) {
              alertify.error(`It should not exceed ${maxLength} characters!`);
              return false;
          }
          if (required && !val) {
              alertify.error(typeof required == 'string' ? required : 'It must not be empty!')
              return false;
          }
          if (check) {
              let err = check(val)
              if (err) {
                  alertify.error(err)
                  return false;
              }
          }
          resolve(val);
          dialog && dialog.close()
      }

      dialog = $.confirm({
          animateFromElement: false,
          title,
          content,
          buttons: {
              submit: {
                  keys: ['ENTER'],
                  btnClass: 'btn-primary',
                  action: function () { return submit(this) }

              },
              cancel: {

                  action: f => {
                      resolve(null);
                  }
              }
          },
          onContentReady() {
              content.find('.textArea').focus()
          }
      })
  })
}