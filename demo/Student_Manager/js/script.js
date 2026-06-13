$(document).ready(function() {
    // 1. Tab switching
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $(this).addClass('active');
    });

    // 2. Category selection
    $('.cat-item').click(function() {
        $('.cat-item').removeClass('active');
        $(this).addClass('active');
    });

    // 3. Checkout Button Simple Animation
    $('.checkout-btn').mousedown(function() {
        $(this).css('transform', 'scale(0.95)');
    }).mouseup(function() {
        $(this).css('transform', 'scale(1)');
    });

    // 4. Staggered Card Animation
    $('.food-card').each(function(i) {
        $(this).css('animation-delay', (i * 0.15) + 's');
    });
});