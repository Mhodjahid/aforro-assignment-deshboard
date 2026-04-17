import './SalesMap.css'

const markers = [
    { cx: '22%', cy: '38%', color: '#FFA2C0', label: 'North America' },
    { cx: '28%', cy: '62%', color: '#FFCF00', label: 'South America' },
    { cx: '50%', cy: '52%', color: '#00E096', label: 'Africa' },
    { cx: '68%', cy: '35%', color: '#0095FF', label: 'Asia' },
]

function SalesMap() {
    return (
        <div className="sales-map-wrap">
            <div className="map-inner">
                <svg viewBox="0 0 400 200" className="map-svg" aria-label="World map">
                    {/* Ocean */}
                    <rect width="400" height="200" fill="#EBF5FB" rx="8" />

                    {/* North America */}
                    <ellipse cx="90" cy="75" rx="55" ry="40" fill="#C8DFF0" />
                    <ellipse cx="80" cy="105" rx="30" ry="20" fill="#C8DFF0" />

                    {/* Greenland */}
                    <ellipse cx="130" cy="35" rx="18" ry="12" fill="#C8DFF0" />

                    {/* South America */}
                    <ellipse cx="112" cy="148" rx="28" ry="38" fill="#C8DFF0" />

                    {/* Europe */}
                    <ellipse cx="200" cy="65" rx="22" ry="18" fill="#C8DFF0" />

                    {/* Africa */}
                    <ellipse cx="205" cy="118" rx="28" ry="42" fill="#C8DFF0" />

                    {/* Russia / North Asia */}
                    <ellipse cx="295" cy="52" rx="80" ry="22" fill="#C8DFF0" />

                    {/* Middle East */}
                    <ellipse cx="238" cy="88" rx="18" ry="14" fill="#C8DFF0" />

                    {/* South Asia */}
                    <ellipse cx="268" cy="105" rx="20" ry="16" fill="#C8DFF0" />

                    {/* East Asia / China */}
                    <ellipse cx="310" cy="85" rx="35" ry="25" fill="#C8DFF0" />

                    {/* SE Asia */}
                    <ellipse cx="330" cy="118" rx="20" ry="14" fill="#C8DFF0" />

                    {/* Japan */}
                    <ellipse cx="355" cy="72" rx="8" ry="14" fill="#C8DFF0" />

                    {/* Australia */}
                    <ellipse cx="338" cy="158" rx="32" ry="22" fill="#C8DFF0" />

                    {/* New Zealand */}
                    <ellipse cx="375" cy="168" rx="7" ry="10" fill="#C8DFF0" />
                </svg>

                {/* Colored markers */}
                {markers.map((m) => (
                    <div
                        key={m.label}
                        className="map-pin"
                        style={{ left: m.cx, top: m.cy, '--c': m.color }}
                        title={m.label}
                    >
                        <span className="pin-ring3" />
                        <span className="pin-ring2" />
                        <span className="pin-core" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SalesMap
