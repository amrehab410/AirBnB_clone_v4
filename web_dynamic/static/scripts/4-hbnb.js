$(document).ready(function () {
    const amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(":checked")) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name')
        }
        else {
            delete amenities[$(this).attr('data-id')]
        }
        $(".amenities H4").text(Object.values(amenities).join(', '));
    })

    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data.status == 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
    function fetchPlaces() {
        const PLACES_URL = `http://localhost:5001/api/v1/places_search/`;
        $.ajax({
            url: PLACES_URL,
            type: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ amenities: Object.values(amenityObj) }),
            success: function (response) {
                $('SECTION.places').empty();
                for (const r of response) {
                    const article = ['<article>',
                        '<div class="title_box">',
                        `<h2>${r.name}</h2>`,
                        `<div class="price_by_night">$${r.price_by_night}</div>`,
                        '</div>',
                        '<div class="information">',
                        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
                        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
                        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
                        '</div>',
                        '<div class="description">',
                        `${r.description}`,
                        '</div>',
                        '</article>'];
                    $('SECTION.places').append(article.join(''));
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    fetchPlaces({});

});