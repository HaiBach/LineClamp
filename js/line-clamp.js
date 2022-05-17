/**
 * LINE-CLAMP FOR JAPAN TEXT
 * Đoạn script xử lý line-clamp cho Japan-text
 *
 * @author Haibach / Nguyễn Văn Thy
 * @version 1.0
 *
 * BIẾN / VARIABLES
 * lineClamp: số dòng hiển thị
 * endCharNum: số lượng kí tự cuối cùng hiển thị
 * ellipsis: kí tự hiển thị ellipsis
 */
jQuery(function() {
  var $textJapan = $('.lineclamp-ja')
  var lineClamp = 2
  var endCharNum = 2
  var ellipsis = '...'
  
  /** FUNCTION: SETUP LINE CLAMP */
  var setupLineClamp = function($text) {
    var result = ''
    var text = $text.data('text')
    
    // Reset the text content
    $text.text( text[0] )

    var textHeight = $text.outerHeight()
    var textMaxHeight = Math.ceil(textHeight * lineClamp)
    var textCur = ''
    var textSliceEnd = endCharNum == 0 ? '' : text.slice(-endCharNum)

    for (var i = 1; i < text.length; i++) {
      textCur = text.slice(0, i) + ellipsis + textSliceEnd
      $text.text(textCur)
      textHeight = $text.outerHeight()

      // Check to stop the loop
      // Case : endloop
      if (i == text.length - 1) {
        result = text
      }
      // Case : normal check
      else if (textHeight > textMaxHeight) {
        result = text.slice(0, i - 1) + ellipsis + textSliceEnd
        break
      }
    }
    $text.text(result)
  }

  $textJapan.each(function() {
    var $text = $(this)
    var timer

    $text.attr('data-text', $text.text())
    
    // Do first time
    setupLineClamp($text)

    // Event resize
    $(window).on('resize', function(e) {
      clearTimeout(timer)
      timer = setTimeout(function() { setupLineClamp($text)}, 400)
    })
  })
});
