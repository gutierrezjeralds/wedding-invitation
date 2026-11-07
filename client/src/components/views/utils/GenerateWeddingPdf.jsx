import { jsPDF } from 'jspdf';

export async function downloadWeddingDetailsPdf(CONTENT, CONTENT_ENTOURAGE) {
    try {
        const weddingDate = CONTENT?.TITLE_DATE;
        const ceremonyVenue = CONTENT?.TITLE_CHURCH;
        const ceremonyAddress = CONTENT?.TITLE_CHURCH_ADDRESS;
        const receptionVenue = CONTENT?.TITLE_RECEPTION;
        const receptionAddress = CONTENT?.TITLE_RECEPTION_ADDRESS;
        const attireColors = CONTENT?.ATTIRE_COLORS;

        const doc = new jsPDF();
        const primaryColor = [107, 29, 47]; // #6B1D2F (Wine Red)
        const darkTextColor = [40, 40, 40];
        const cardBgColor = [250, 247, 245]; // Soft cream card background
        const borderColor = [225, 210, 212];

        let yPos = 20;

        // --- HEADER BANNER ---
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 36, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Wedding Invitation Details', 105, 20, { align: 'center' });

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Jerald & Sheila', 105, 28, { align: 'center' });

        yPos = 46;

        // --- EVENT SCHEDULE & VENUES CARD ---
        doc.setFillColor(...cardBgColor);
        doc.setDrawColor(...borderColor);
        doc.roundedRect(14, yPos, 182, 46, 3, 3, 'FD'); // Increased box height to 46

        doc.setTextColor(...primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('EVENT SCHEDULE & VENUES', 105, yPos + 8, { align: 'center' });

        doc.setTextColor(...darkTextColor);
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        
        let venueY = yPos + 16;
        doc.text(`Date & Time: ${weddingDate || 'Saturday, July 17, 2027'}`, 105, venueY, { align: 'center' });
        
        venueY += 6;
        doc.text(`Ceremony: ${ceremonyVenue || 'St. John the Evangelist Parish Church'}`, 105, venueY, { align: 'center' });
        
        if (ceremonyAddress) {
            venueY += 5;
            doc.setFontSize(8.5);
            doc.setTextColor(100, 100, 100);
            doc.text(ceremonyAddress, 105, venueY, { align: 'center' });
            doc.setFontSize(9.5);
            doc.setTextColor(...darkTextColor);
        }

        venueY += 7;
        doc.text(`Reception: ${receptionVenue || 'Casa Lucido Events Place'}`, 105, venueY, { align: 'center' });
        
        if (receptionAddress) {
            venueY += 5;
            doc.setFontSize(8.5);
            doc.setTextColor(100, 100, 100);
            doc.text(receptionAddress, 105, venueY, { align: 'center' });
        }

        yPos += 54; // Push next section down past the venue card

        // Helper to render fully centered category cards with names on new lines
        const renderCategoryCard = (title, itemsObjOrArray) => {
            if (!itemsObjOrArray) return;
            
            let entries = [];
            if (Array.isArray(itemsObjOrArray)) {
                if (itemsObjOrArray.length === 0) return;
                entries = [{ label: '', values: itemsObjOrArray }];
            } else {
                entries = Object.entries(itemsObjOrArray)
                    .map(([key, val]) => {
                        if (!val) return null;
                        if (typeof val === 'object' && val.NAMES) {
                            return { label: val.TITLE || key, values: val.NAMES };
                        }
                        if (typeof val === 'object' && (val.FATHER || val.MOTHER)) {
                            return { label: val.TITLE || key, values: [val.FATHER, val.MOTHER].filter(Boolean) };
                        }
                        if (typeof val === 'object' && val.NAME) {
                            return { label: val.TITLE || key, values: [val.NAME] };
                        }
                        if (Array.isArray(val)) {
                            return { label: key, values: val };
                        }
                        return null;
                    })
                    .filter(Boolean);
            }

            if (entries.length === 0) return;

            // Calculate card height dynamically
            let calculatedHeight = 16;
            entries.forEach(e => {
                if (e.label) calculatedHeight += 6; 
                const vals = Array.isArray(e.values) ? e.values : [e.values];
                vals.forEach(v => {
                    const lines = doc.splitTextToSize(v, 160);
                    calculatedHeight += lines.length * 5;
                });
                calculatedHeight += 3; // spacing between entries
            });

            // Page overflow check
            if (yPos + calculatedHeight > 280) {
                doc.addPage();
                yPos = 20;
            }

            // Draw Card Background
            doc.setFillColor(...cardBgColor);
            doc.setDrawColor(...borderColor);
            doc.roundedRect(14, yPos, 182, calculatedHeight, 3, 3, 'FD');

            // Card Title Header
            doc.setTextColor(...primaryColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(title.toUpperCase(), 105, yPos + 9, { align: 'center' });

            let currentY = yPos + 16;

            // Render Sub-entries inside Card (Centered & New Line per item)
            entries.forEach(entry => {
                if (entry.label) {
                    doc.setTextColor(...primaryColor);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(9.5);
                    doc.text(entry.label.toUpperCase(), 105, currentY, { align: 'center' });
                    currentY += 5;
                }

                doc.setTextColor(...darkTextColor);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9.5);

                const vals = Array.isArray(entry.values) ? entry.values : [entry.values];
                vals.forEach(val => {
                    const splitText = doc.splitTextToSize(val, 160);
                    doc.text(splitText, 105, currentY, { align: 'center' });
                    currentY += splitText.length * 5;
                });

                currentY += 3; // Gap between sub-groups
            });

            yPos += calculatedHeight + 6;
        };

        // --- RENDER ENTOURAGE SECTIONS ---
        if (CONTENT_ENTOURAGE?.PARENTS) {
            renderCategoryCard('Parents', {
                'Parents of the Groom': [CONTENT_ENTOURAGE.PARENTS.GROOM?.FATHER, CONTENT_ENTOURAGE.PARENTS.GROOM?.MOTHER].filter(Boolean),
                'Parents of the Bride': [CONTENT_ENTOURAGE.PARENTS.BRIDE?.FATHER, CONTENT_ENTOURAGE.PARENTS.BRIDE?.MOTHER].filter(Boolean)
            });
        }

        if (CONTENT_ENTOURAGE?.PRINCIPAL_SPONSORS?.NAMES?.length > 0) {
            renderCategoryCard('Principal Sponsors', CONTENT_ENTOURAGE.PRINCIPAL_SPONSORS.NAMES);
        }

        if (CONTENT_ENTOURAGE?.SECONDARY_SPONSORS) {
            renderCategoryCard('Secondary Sponsors', {
                'Candle': CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CANDLE?.NAMES,
                'Veil': CONTENT_ENTOURAGE.SECONDARY_SPONSORS.VEIL?.NAMES,
                'Cord': CONTENT_ENTOURAGE.SECONDARY_SPONSORS.CORD?.NAMES
            });
        }

        if (CONTENT_ENTOURAGE?.ENTOURAGE) {
            renderCategoryCard('Entourage', {
                'Maid of Honor': CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY?.MOH?.NAME,
                'Best Man': CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_PRIMARY?.BEST_MAN?.NAME,
                'Bridesmaids': CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP?.BRIDSEMAIDS?.NAMES || CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP?.BRIDESMAIDS?.NAMES,
                'Groomsmen': CONTENT_ENTOURAGE.ENTOURAGE.BRIDAL_GROUP?.GROOMSMEN?.NAMES
            });
        }

        if (CONTENT_ENTOURAGE?.LITTLE_ATTENDANT) {
            renderCategoryCard('Little Attendants', {
                'Bearers': [
                    CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS?.RING?.NAME ? `Ring: ${CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.RING.NAME}` : null,
                    CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS?.COIN?.NAME ? `Coin: ${CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.COIN.NAME}` : null,
                    CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS?.BIBLE?.NAME ? `Bible: ${CONTENT_ENTOURAGE.LITTLE_ATTENDANT.BEARERS.BIBLE.NAME}` : null,
                ].filter(Boolean),
                'Flower Girls': CONTENT_ENTOURAGE.LITTLE_ATTENDANT.FLOWER_GIRLS?.NAMES
            });
        }

        // --- ATTIRE COLOR PALETTE (BOTTOM PART) ---
        if (attireColors && typeof attireColors === 'object') {
            const colorEntries = Object.entries(attireColors);
            if (colorEntries.length > 0) {
                const swatchRadius = 6; // Circle radius
                const spacingX = 32;    // Horizontal spacing between center points of individual color columns
                const totalWidth = (colorEntries.length - 1) * spacingX;
                const startX = 105 - (totalWidth / 2); // Center horizontally in document (Page width = 210)

                // Calculate dynamic card height based on items
                let cardHeight = 24; // Header + padding
                colorEntries.forEach(([_, val]) => {
                    if (val?.APPLIES_TO && Array.isArray(val.APPLIES_TO)) {
                        const allRoles = ['Parent', 'Principal', 'Entourage', 'Guest'];
                        const isAll = allRoles.every(role => val.APPLIES_TO.includes(role)) && val.APPLIES_TO.length === allRoles.length;
                        if (!isAll) cardHeight += 8; // Extra vertical space for box if subtitle exists
                    }
                });

                // Page overflow check
                if (yPos + cardHeight > 280) {
                    doc.addPage();
                    yPos = 20;
                }

                // Render Main Card Background
                doc.setFillColor(...cardBgColor);
                doc.setDrawColor(...borderColor);
                doc.roundedRect(14, yPos, 182, cardHeight, 3, 3, 'FD');

                // Card Title
                doc.setTextColor(...primaryColor);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text('ATTIRE & COLOR MOTIF', 105, yPos + 9, { align: 'center' });

                let itemStartY = yPos + 14;

                // Render each color item with its own individual rounded border box
                colorEntries.forEach(([key, val], index) => {
                    const cx = startX + (index * spacingX);
                    const hex = val?.HEX || '#FFFFFF';
                    const appliesTo = val?.APPLIES_TO || [];
                    
                    const allRoles = ['Parent', 'Principal', 'Entourage', 'Guest'];
                    const isAll = allRoles.every(role => appliesTo.includes(role)) && appliesTo.length === allRoles.length;

                    // Convert Hex to RGB array for jsPDF
                    let r = 255, g = 255, b = 255;
                    if (hex.startsWith('#') && hex.length === 7) {
                        r = parseInt(hex.slice(1, 3), 16);
                        g = parseInt(hex.slice(3, 5), 16);
                        b = parseInt(hex.slice(5, 7), 16);
                    }

                    // Individual Item Box Dimensions
                    const boxWidth = 26;
                    const boxHeight = isAll ? 16 : 22;
                    const boxX = cx - (boxWidth / 2);
                    const boxY = itemStartY;

                    // Draw individual rounded border box around the swatch (and title if present)
                    doc.setFillColor(255, 255, 255);
                    doc.setDrawColor(...borderColor);
                    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 2, 2, 'FD');

                    // Draw circular swatch inside the box
                    const circleY = boxY + 8;
                    doc.setFillColor(r, g, b);
                    doc.setDrawColor(...primaryColor);
                    doc.setLineWidth(0.4);
                    doc.circle(cx, circleY, swatchRadius, 'FD');

                    // Render Subtitle / Applies To labels inside the box if not 'All'
                    if (!isAll) {
                        const labelText = appliesTo.join(', ');
                        doc.setTextColor(...darkTextColor);
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(6.5);
                        
                        // Handle text wrapping if label is slightly long
                        const splitLabel = doc.splitTextToSize(labelText, boxWidth - 4);
                        doc.text(splitLabel, cx, boxY + 17, { align: 'center' });
                    }
                });

                yPos += cardHeight + 6;
            }
        }

        // --- FOOTER ---
        if (yPos > 275) doc.addPage();
        doc.setFontSize(8.5);
        doc.setTextColor(150, 150, 150);
        doc.text('We are excited to celebrate this special day with you!', 105, 288, { align: 'center' });

        doc.save('Jerald-and-Sheila-Wedding-Details.pdf');
    } catch (err) {
        console.error('Failed to generate PDF:', err);
        alert('Could not generate PDF download at this moment. Please try again.');
    }
}