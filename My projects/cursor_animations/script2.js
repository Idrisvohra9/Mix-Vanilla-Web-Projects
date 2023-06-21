var a_link = document.querySelectorAll("a");
// Handle mouse over/out event on links
a_link.forEach(e => e.addEventListener('mouseenter', handleMouseEnter));
a_link.forEach(e => e.addEventListener('mouseleave', handleMouseLeave));
window.addEventListener('mousemove', handleMouseMove);
// Move the cursor in dom/window
function handleMouseMove(event) {
    var top = event.pageY - (cursor.clientHeight / 2);
    var left = event.pageX - (cursor.clientWidth / 2);
    cursor.style.top = top + 'px';
    cursor.style.left = left + 'px';
}
// event: mouse enter on link
function handleMouseEnter(event) {
    var _a = this;
    var _a_width = _a.offsetWidth;
    var classes = ['shape1', 'shape2', 'shape3', 'shape4'];
    var shape_class = classes[Math.floor(Math.random() * classes.length)];
    // $('#cursor').css('width', _a_width+'px').addClass('hovered '+cls);
    cursor.style.width = _a_width + 'px';
    cursor.classList.add('hovered', shape_class);
}
// event: mouse leave on link
function handleMouseLeave() {
    cursor.style.width = '60px';
    cursor.classList = '';
}