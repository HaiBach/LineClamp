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
  var $textJP = $('.lineclamp-ja')
  var lineClamp = 2
  var endCharNum = 2
  var ellipsis = '...'
  var ghostClass = 'lineclamp-ja__replace'
  
  /** FUNCTION: SETUP LINE CLAMP */
  var setupLineClamp = function($text) {
    var result = ''
    var text = $text.text()
    
    var $textGhost = $text.next('.' + ghostClass)
    if (!$textGhost.length) {
      $textGhost = $text.clone()
        .addClass(ghostClass)
        .attr('title', text)
        
      $text.after($textGhost)
      $text.css('display', 'none')
    }
    
    // Reset the textGhost content
    $textGhost.text( text[0] )

    var ghostHeight = $textGhost.outerHeight()
    var ghostMaxHeight = Math.ceil(ghostHeight * lineClamp)
    var textCur = ''
    var textSliceEnd = endCharNum == 0 ? '' : text.slice(-endCharNum)
    var textHeight

    for (var i = 1; i < text.length; i++) {
      textCur = text.slice(0, i) + ellipsis + textSliceEnd
      $textGhost.text(textCur)
      textHeight = $textGhost.outerHeight()
      console.log(textCur, i, textHeight, ghostMaxHeight)

      // Check to stop the loop
      // Case : endloop
      if (i == text.length - 1) {
        result = text
      }
      // Case : normal check
      else if (textHeight > ghostMaxHeight) {
        result = text.slice(0, i - 1) + ellipsis + textSliceEnd
        break
      }
    }
    $textGhost
      .text(result)
    // console.log('#1', result, ghostMaxHeight)
  }

  $textJP.each(function() {
    var $text = $(this)
    var timer
    
    // Do first time
    setupLineClamp($text)

    // Event resize
    $(window).on('resize', function(e) {
      clearTimeout(timer)
      timer = setTimeout(function() { setupLineClamp($text)}, 100)
    })
  })
});
