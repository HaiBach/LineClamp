/**
 * LINE-CLAMP FOR JAPAN TEXT
 * Đoạn script xử lý line-clamp cho Japan-text
 *
 * @author Haibach / Nguyễn Văn Thy
 * @version 1.0
 *
 * BIẾN / VARIABLES
 * lineClamp: số dòng hiển thị
 * endChar: (string) kí tự cuối cùng hiển thị, nằm kế bên ellipsis
 * endChar: (number) số lượng kí tự cuối cùng hiển thị
 * ellipsis: kí tự hiển thị ellipsis
 */
jQuery(function() {
  var $textJapan = $('.lineclamp-ja')
  
  /** FUNCTION: SETUP LINE CLAMP */
  var setupLineClamp = function($text) {
    var result = ''
    var text = $text.data('text')
    
    var dataLineClamp = $text.data('lineclamp')
    var dataEndChar = $text.data('endchar')
    var lineClamp = dataLineClamp !== undefined ? dataLineClamp : 1
    var endChar = (dataEndChar !== undefined) && (typeof(dataEndChar) == 'string') ? dataEndChar : ''
    var endCharNum = (dataEndChar !== undefined) && (typeof(dataEndChar) == 'number')  ? dataEndChar : 0
    var ellipsis = '...'

    // Setup endCharNum, priority for `endChar`
    if (endChar != '') {
      endCharNum = endChar.length
    }
    
    // Reset the text content
    $text.text( text[0] )

    var textHeight = $text.outerHeight()
    var textMaxHeight = Math.ceil(textHeight * lineClamp)
    var textCur = ''

    // Setup the end character in text
    var textSliceEnd = ''
    if (endChar != '') {
      textSliceEnd = endChar
    }
    else if(endCharNum != 0) {
      textSliceEnd = text.slice(-endCharNum)
    }

    // Hidden text during setup
    $text.css('visibility', 'hidden')


    for (var i = 1; i < text.length; i++) {
      textCur = text.slice(0, i) + ellipsis + textSliceEnd
      $text.text(textCur)
      textHeight = $text.outerHeight()

      // Check to stop the loop
      // Case : normal check
      if (i == text.length - 1) {
        result = text
      }
      // Case : endloop
      else if (textHeight > textMaxHeight) {
        result = text.slice(0, i - 1) + ellipsis + textSliceEnd
        break
      }
    }
    $text.text(result).css('visibility', '')
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
