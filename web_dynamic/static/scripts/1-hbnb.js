$(document).ready(function () {
    $('INPUT.checkbox').change(function () {
        if ($(this).is(":checked")) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name')
        }
        else {
            delete amenities[$(this).attr('data-id')]
        }
        $(".amenities H4").text(Object.values(amenities).join(', '));
    })
});