#!/bin/bash

# Script to update dashboard images in static website
# Run this script from the static-website directory

echo "==================================="
echo "Dashboard Images Update Script"
echo "==================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the static-website directory"
    echo "   cd /workspaces/default/code/static-website"
    echo "   bash update-dashboard-images.sh"
    exit 1
fi

# Define source and destination paths
SRC_DIR="../src/imports"
DEST_DIR="./assets/images"

# Check if source directory exists
if [ ! -d "$SRC_DIR" ]; then
    echo "❌ Error: Source directory not found: $SRC_DIR"
    exit 1
fi

echo "📁 Looking for dashboard images in: $SRC_DIR"
echo ""

# Function to copy image if it exists
copy_if_exists() {
    local src=$1
    local dest=$2
    local name=$3

    if [ -f "$src" ]; then
        cp "$src" "$dest"
        echo "✅ Copied: $name"
        return 0
    else
        echo "⏩ Skipped: $name (file not found)"
        return 1
    fi
}

# Copy images
copied=0

copy_if_exists "$SRC_DIR/Student_dashboard.png" "$DEST_DIR/dashboard-student.png" "Student Dashboard"
copied=$((copied + $?))

copy_if_exists "$SRC_DIR/Parent_dashboard.png" "$DEST_DIR/dashboard-parent.png" "Parent Dashboard"
copied=$((copied + $?))

copy_if_exists "$SRC_DIR/Kitchen_staff_dashboard.png" "$DEST_DIR/dashboard-kitchen.png" "Kitchen Staff Dashboard"
copied=$((copied + $?))

copy_if_exists "$SRC_DIR/Canteen_manager_dashboard.png" "$DEST_DIR/dashboard-canteen.png" "Canteen Manager Dashboard"
copied=$((copied + $?))

copy_if_exists "$SRC_DIR/School_manager_dashboard.png" "$DEST_DIR/dashboard-school.png" "School Manager Dashboard"
copied=$((copied + $?))

echo ""
echo "==================================="

if [ $copied -eq 0 ]; then
    echo "✅ All dashboard images updated successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Open index.html in your browser"
    echo "2. Navigate to the Dashboard Previews section"
    echo "3. Verify all images display correctly"
else
    echo "⚠️  Some images were not found and could not be copied"
    echo ""
    echo "To manually update images:"
    echo "1. Copy your dashboard PNG files to: $DEST_DIR/"
    echo "2. Rename them as follows:"
    echo "   - Student_dashboard.png → dashboard-student.png"
    echo "   - Parent_dashboard.png → dashboard-parent.png"
    echo "   - Kitchen_staff_dashboard.png → dashboard-kitchen.png"
    echo "   - Canteen_manager_dashboard.png → dashboard-canteen.png"
    echo "   - School_manager_dashboard.png → dashboard-school.png"
fi

echo "==================================="
