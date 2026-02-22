import fs from "fs"
import path from "path"

// Define paths
const chartExamplesDir = path.resolve("src/examples/ui/chart")
const outputFilePath = path.resolve("src/data/charts.ts")
const registryChartsDir = path.resolve("public/r/charts")

// Ensure directory exists
if (!fs.existsSync(registryChartsDir)) {
  fs.mkdirSync(registryChartsDir, { recursive: true })
}

// Function to read file content
function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath, "utf8")
}

// Function to get component name from file path
function getComponentName(filePath: string): string {
  const fileName = path.basename(filePath, ".tsx")
  // Convert kebab-case to PascalCase
  return fileName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

// Function to get slug from file name
function getSlug(fileName: string): string {
  return fileName.replace(".tsx", "")
}

// Main function to generate charts.ts and registry JSONs
function generateChartsData() {
  try {
    // Find all chart example files
    const chartFiles = fs
      .readdirSync(chartExamplesDir)
      .filter((file) => file.endsWith(".tsx"))
      .sort()

    // 1. Generate individual registry JSON files
    chartFiles.forEach((file) => {
      const slug = getSlug(file)
      const filePath = path.join(chartExamplesDir, file)
      const content = readFileContent(filePath)

      const registryItem = {
        name: slug,
        type: "registry:example",
        files: [
          {
            path: `src/examples/ui/chart/${file}`,
            content: content,
            type: "registry:example",
          },
        ],
      }

      fs.writeFileSync(
        path.join(registryChartsDir, `${slug}.json`),
        JSON.stringify(registryItem, null, 2),
      )
    })

    // 2. Generate charts.ts content
    let chartsTsContent = `// This file is auto-generated. Do not edit manually.\n\n`
    chartsTsContent += `import dynamic from "next/dynamic"\n\n`

    // Add dynamic imports for each chart component
    chartFiles.forEach((file) => {
      const componentName = getComponentName(file)
      const slug = getSlug(file)
      chartsTsContent += `const ${componentName} = dynamic(\n`
      chartsTsContent += `  () => import("@/examples/ui/chart/${slug}"),\n`
      chartsTsContent += `)\n`
    })

    chartsTsContent += `\nexport interface ChartExample {\n`
    chartsTsContent += `  component: React.ComponentType\n`
    chartsTsContent += `  name: string\n`
    chartsTsContent += `  slug: string\n`
    chartsTsContent += `}\n\n`

    chartsTsContent += `export const charts: ChartExample[] = [\n`

    // Add each chart to the array
    chartFiles.forEach((file, index) => {
      const componentName = getComponentName(file)
      const slug = getSlug(file)

      chartsTsContent += `  {\n`
      chartsTsContent += `    component: ${componentName},\n`
      chartsTsContent += `    name: "${componentName}",\n`
      chartsTsContent += `    slug: "${slug}",\n`
      chartsTsContent += `  }${index < chartFiles.length - 1 ? "," : ""}\n`
    })

    chartsTsContent += `]\n`

    // Write the file
    fs.writeFileSync(outputFilePath, chartsTsContent)

    console.log(`Successfully generated ${outputFilePath}`)
    console.log(
      `Generated ${chartFiles.length} registry JSON files in ${registryChartsDir}`,
    )
  } catch (error) {
    console.error("Error generating charts data:", error)
  }
}

// Run the script
generateChartsData()
