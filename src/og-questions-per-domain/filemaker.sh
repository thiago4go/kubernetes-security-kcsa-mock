#!/bin/bash

# Define an array with the six file names.
files=(
    "cloudNativeSecurityQuestions.js"
    "kubernetesClusterComponentSecurityQuestions.js"
    "kubernetesSecurityFundamentalsQuestions.js"
    "kubernetesThreatModelQuestions.js"
    "platformSecurityQuestions.js"
    "complianceAndSecurityFrameworksQuestions.js"
)

# Loop through each file name in the array.
for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "Creating $file..."
        # Create the file and insert a template export.
        cat <<EOF > "$file"
// TODO: Implement functionality for ${file%%.js}
export const ${file%%.js} = {};
EOF
    else
        echo "$file already exists."
    fi
done
