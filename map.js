function initMap() {
    // Create a map centered on India
    const map = new google.maps.Map(document.getElementById('leak-map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // India coordinates
        zoom: 5,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2D333C"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    });

    // Sample leak data (in a real app, this would come from your backend)
    const leaks = [
        { lat: 19.0760, lng: 72.8777, severity: 'high', type: 'pipe' }, // Mumbai
        { lat: 28.6139, lng: 77.2090, severity: 'medium', type: 'tap' }, // Delhi
        { lat: 12.9716, lng: 77.5946, severity: 'low', type: 'tank' }, // Bangalore
        { lat: 17.3850, lng: 78.4867, severity: 'high', type: 'pipe' }, // Hyderabad
        { lat: 13.0827, lng: 80.2707, severity: 'medium', type: 'other' }, // Chennai
    ];

    // Define icons based on leak type and severity
    const icons = {
        pipe: {
            high: 'images/pipe-high.png',
            medium: 'images/pipe-medium.png',
            low: 'images/pipe-low.png'
        },
        tap: {
            high: 'images/tap-high.png',
            medium: 'images/tap-medium.png',
            low: 'images/tap-low.png'
        },
        tank: {
            high: 'images/tank-high.png',
            medium: 'images/tank-medium.png',
            low: 'images/tank-low.png'
        },
        other: {
            high: 'images/leak-high.png',
            medium: 'images/leak-medium.png',
            low: 'images/leak-low.png'
        }
    };

    // Add markers for each leak
    leaks.forEach(leak => {
        new google.maps.Marker({
            position: { lat: leak.lat, lng: leak.lng },
            map: map,
            icon: icons[leak.type][leak.severity],
            title: `Water leak (${leak.type}, ${leak.severity} severity)`
        });
    });

    // Add heatmap layer for leak density
    const heatmapData = leaks.map(leak => {
        return {
            location: new google.maps.LatLng(leak.lat, leak.lng),
            weight: leak.severity === 'high' ? 0.8 : (leak.severity === 'medium' ? 0.5 : 0.2)
        };
    });

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        radius: 30,
        opacity: 0.6
    });

    // Add click event to report leaks
    map.addListener('click', function(e) {
        // In a real app, this would open the report form with the clicked location
        console.log('Map clicked at:', e.latLng.lat(), e.latLng.lng());
    });
}