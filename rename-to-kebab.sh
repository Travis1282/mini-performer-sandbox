#!/bin/bash

# Function to convert to kebab case
to_kebab_case() {
    echo "$1" | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]'
}

# Function to process a directory
process_directory() {
    local source_dir="$1"
    local target_base_dir="/Users/kelly/hono-pocs/cloudflare-pages/src/pwc"
    
    # Create the target directory if it doesn't exist
    local dir_name=$(basename "$source_dir")
    local target_dir="$target_base_dir/$dir_name"
    mkdir -p "$target_dir"
    
    # Copy contents first
    cp -R "$source_dir"/* "$target_dir"/ 2>/dev/null || true
    
    # Process all files and directories, excluding .git and node_modules
    find "$target_dir" -depth -name "*" | while read item; do
        # Skip if it's the base directory
        if [ "$item" = "$target_dir" ]; then
            continue
        fi

        dirname=$(dirname "$item")
        basename=$(basename "$item")
        
        # Convert the name to kebab case
        kebab_name=$(to_kebab_case "$basename")
        
        # Only rename if the name actually changed
        if [ "$basename" != "$kebab_name" ]; then
            mv "$item" "$dirname/$kebab_name"
            echo "Renamed: $basename → $kebab_name"
        fi
    done
}

# Process each directory
process_directory "/Users/kelly/public-web-client/src/hooks"
process_directory "/Users/kelly/public-web-client/src/contexts"
process_directory "/Users/kelly/public-web-client/src/utils"
