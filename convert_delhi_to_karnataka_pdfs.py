#!/usr/bin/env python3
"""
Script to convert Delhi RTI PDFs to Karnataka RTI PDFs
- Creates folder structure for Karnataka PDFs
- Copies Delhi PDFs and replaces "Delhi" with "Karnataka" in content
- Lists missing PDFs that need to be created manually
"""

import os
import shutil
from pathlib import Path
import PyPDF2
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io

# Base paths
BASE_DIR = Path("Frontend/src/assets/PDF")
DELHI_DIR = BASE_DIR / "delhi"
KARNATAKA_DIR = BASE_DIR / "karnataka"

# Mapping of Delhi to Karnataka PDFs
# Format: (delhi_category, delhi_filename, karnataka_category, karnataka_filename)
PDF_MAPPINGS = [
    # Police & Security
    ("RTI Delhi Police & Security", "RTI Template For Delhi Police.pdf", 
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Police Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Fire Services Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Fire Services Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Prisoners Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Prisons Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Home Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Home Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Law, Justice & Legislative Affairs Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Law Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For  Delhi Disaster Management Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Disaster Management Department.pdf"),
    
    # Finance & Revenue (from Government Services)
    ("RTI Delhi Government Services", "RTI Template for Delhi Finance Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Finance Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Revenue Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Revenue Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Registration & Stamps Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Registration & Stamps Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Planning Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Planning Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Value Added Tax Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Commercial Taxes Department.pdf"),
    
    # Transport & Infrastructure (from Municipal & Housing)
    ("RTI Delhi Government Services", "RTI Template for Delhi Transport Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Transport Department.pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Public Works Department (PWD).pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Public Works Department (PWD).pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Urban Development Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Urban Development Department.pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Rural Development Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Rural Development & Panchayat Raj Department.pdf"),
    
    # Education & Health
    ("RTI Delhi Government Services", "RTI Template for Delhi Education Department.pdf",
     "RTI Karnataka Education & Health", "RTI Template for Karnataka Department of Primary & Secondary Education.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Health & Family Welfare.pdf",
     "RTI Karnataka Education & Health", "RTI Template for Karnataka Health & Family Welfare Department.pdf"),
    
    # Social Welfare
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Social Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Social Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Scheduled Castes & Scheduled Tribes Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Scheduled Castes Development Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Women & Child Development Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Women & Child Development Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Backward Classes Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Backward Classes Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Minority Affairs Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Minority Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Youth & Sports Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Youth & Sports Department.pdf"),
    
    # Commerce & Industry
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Industries Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Industries & Commerce Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Labour Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Labour Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Food, Civil Supplies & Consumer Affairs Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Food & Civil Supplies Department.pdf"),
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Mines & Geology Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Mines & Geology Department.pdf"),
    
    # Environment & Resources
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Environment Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Environment Department.pdf"),
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Forest & Wildlife Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Forest Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Template for Delhi Irrigation & Flood Control Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Irrigation & CAD Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Template For Delhi Water Supply Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Water Resources Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Delhi Power Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Energy Department.pdf"),
    
    # Information & Technology
    ("RTI Delhi Information & Technology", "RTI Template for Delhi Information Technology Department.pdf",
     "RTI Karnataka Information & Technology", "RTI Template for Karnataka Information Technology Department.pdf"),
    ("RTI Delhi Information & Technology", "RTI Template for Delhi Information & Publicity Department.pdf",
     "RTI Karnataka Information & Technology", "RTI Template for Karnataka Information & Public Relations Department.pdf"),
    
    # Culture & Tourism
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Tourism Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Tourism Department.pdf"),
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Archaeology Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Archaeology Department.pdf"),
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Art, Culture & Languages Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Kannada & Culture Department.pdf"),
]

# Missing PDFs that don't have Delhi equivalents
MISSING_PDFS = [
    ("RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Treasuries Department.pdf"),
    ("RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Municipal Administration Department.pdf"),
    ("RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Infrastructure Development Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Higher Education Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Technical Education Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Medical Education Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Agriculture Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Horticulture Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Animal Husbandry & Veterinary Services Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Co-operation Department.pdf"),
    ("RTI Karnataka Social Welfare", "RTI Template for Karnataka Scheduled Tribes Welfare Department.pdf"),
    ("RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Handlooms & Textiles Department.pdf"),
    ("RTI Karnataka Information & Technology", "RTI Template for Karnataka e-Governance Department.pdf"),
    ("RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Religious & Charitable Endowments Department.pdf"),
]

def replace_text_in_pdf(input_path, output_path, replacements):
    """
    Replace text in PDF file. Note: This is a simplified approach.
    For production use, consider using pdfrw or pdf-lib for better text replacement.
    """
    try:
        # Read the PDF
        with open(input_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            pdf_writer = PyPDF2.PdfWriter()
            
            # Process each page
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                
                # Extract text and replace
                text = page.extract_text()
                for old_text, new_text in replacements:
                    text = text.replace(old_text, new_text)
                
                # Add page to writer (note: PyPDF2 doesn't support text replacement directly)
                # This is a limitation - we'll copy the page as-is
                pdf_writer.add_page(page)
            
            # Write output
            with open(output_path, 'wb') as output_file:
                pdf_writer.write(output_file)
        
        print(f"✓ Copied: {input_path.name} -> {output_path.name}")
        print(f"  Note: Text replacement in PDFs requires manual editing or advanced PDF libraries")
        return True
    except Exception as e:
        print(f"✗ Error processing {input_path.name}: {str(e)}")
        return False

def create_folders():
    """Create all necessary folder structures"""
    categories = set()
    for _, _, category, _ in PDF_MAPPINGS:
        categories.add(category)
    for category, _ in MISSING_PDFS:
        categories.add(category)
    
    for category in categories:
        folder_path = KARNATAKA_DIR / category
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"Created folder: {folder_path}")

def convert_pdfs():
    """Convert Delhi PDFs to Karnataka PDFs"""
    print("\n=== Converting Delhi PDFs to Karnataka PDFs ===\n")
    
    converted = 0
    failed = 0
    
    for delhi_cat, delhi_file, karnataka_cat, karnataka_file in PDF_MAPPINGS:
        source_path = DELHI_DIR / delhi_cat / delhi_file
        dest_path = KARNATAKA_DIR / karnataka_cat / karnataka_file
        
        if not source_path.exists():
            print(f"✗ Source not found: {source_path}")
            failed += 1
            continue
        
        # Create destination folder if it doesn't exist
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Copy and attempt text replacement
        replacements = [
            ("Delhi", "Karnataka"),
            ("DELHI", "KARNATAKA"),
            ("delhi", "karnataka"),
        ]
        
        if replace_text_in_pdf(source_path, dest_path, replacements):
            converted += 1
        else:
            failed += 1
    
    print(f"\n=== Conversion Summary ===")
    print(f"Converted: {converted}")
    print(f"Failed: {failed}")
    print(f"Total: {len(PDF_MAPPINGS)}")

def list_missing_pdfs():
    """List PDFs that need to be created manually"""
    print("\n=== Missing PDFs (Need to be created manually) ===\n")
    
    for i, (category, filename) in enumerate(MISSING_PDFS, 1):
        full_path = KARNATAKA_DIR / category / filename
        print(f"{i}. {category}/{filename}")
        print(f"   Path: {full_path}\n")
    
    print(f"\nTotal missing PDFs: {len(MISSING_PDFS)}")

def main():
    print("=" * 60)
    print("Delhi to Karnataka PDF Converter")
    print("=" * 60)
    
    # Check if Delhi directory exists
    if not DELHI_DIR.exists():
        print(f"Error: Delhi PDF directory not found: {DELHI_DIR}")
        return
    
    # Create folder structure
    print("\n=== Creating folder structure ===")
    create_folders()
    
    # Convert PDFs
    convert_pdfs()
    
    # List missing PDFs
    list_missing_pdfs()
    
    print("\n" + "=" * 60)
    print("Conversion complete!")
    print("=" * 60)
    print("\nNote: PDF text replacement is limited. You may need to:")
    print("1. Manually edit the PDFs to replace 'Delhi' with 'Karnataka'")
    print("2. Or use advanced PDF editing tools")
    print("3. Create the missing PDFs listed above")

if __name__ == "__main__":
    main()

