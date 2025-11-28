#!/usr/bin/env python3
"""
Script to copy Karnataka RTI templates from public folder to src/assets/PDF/karnataka
and rename them to match the expected format in pdfMapping.ts
"""

import os
import shutil
from pathlib import Path

# Source and destination paths (using absolute paths)
SCRIPT_DIR = Path(__file__).parent.absolute()
SOURCE_DIR = SCRIPT_DIR / "Frontend" / "public" / "assets" / "PDF" / "RTI karnataka templates"
DEST_DIR = SCRIPT_DIR / "Frontend" / "src" / "assets" / "PDF" / "karnataka"

# Mapping from template filename format to expected format
# Format: (source_filename_pattern, destination_filename)
FILENAME_MAPPINGS = {
    # Police & Security
    "RTI TEMPLATE FOR KARNATAKA POLICE DEPARTMENT.pdf": "RTI Template for Karnataka Police Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA FIRE SERVICES DEPARTMENT.pdf": "RTI Template for Karnataka Fire Services Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA PRISONS DEPARTMENT.pdf": "RTI Template for Karnataka Prisons Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA HOME DEPARTMENT.pdf": "RTI Template for Karnataka Home Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA LAW DEPARTMENT.pdf": "RTI Template for Karnataka Law Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA DISASTER MANAGEMENT DEPARTMENT.pdf": "RTI Template for Karnataka Disaster Management Department.pdf",
    
    # Finance & Revenue
    "RTI TEMPLATE FOR KARNATAKA FINANCE DEPARTMENT.pdf": "RTI Template for Karnataka Finance Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA REVENUE DEPARTMENT.pdf": "RTI Template for Karnataka Revenue Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA COMMERCIAL TAXES DEPARTMENT.pdf": "RTI Template for Karnataka Commercial Taxes Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA REGISTRATION & STAMPS DEPARTMENT.pdf": "RTI Template for Karnataka Registration & Stamps Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA PLANNING DEPARTMENT.pdf": "RTI Template for Karnataka Planning Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA TREASURIES DEPARTMENT.pdf": "RTI Template for Karnataka Treasuries Department.pdf",
    
    # Transport & Infrastructure
    "RTI TEMPLATE FOR KARNATAKA TRANSPORT DEPARTMENT.pdf": "RTI Template for Karnataka Transport Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA PUBLIC WORKS DEPARTMENT (PWD).pdf": "RTI Template for Karnataka Public Works Department (PWD).pdf",
    "RTI TEMPLATE FOR KARNATAKA URBAN DEVELOPMENT DEPARTMENT.pdf": "RTI Template for Karnataka Urban Development Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA RURAL DEVELOPMENT & PANCHAYAT RAJ DEPARTMENT.pdf": "RTI Template for Karnataka Rural Development & Panchayat Raj Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA MUNICIPAL ADMINISTRATION DEPARTMENT.pdf": "RTI Template for Karnataka Municipal Administration Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA INFRASTRUCTURE DEVELOPMENT DEPARTMENT.pdf": "RTI Template for Karnataka Infrastructure Development Department.pdf",
    
    # Education & Health
    "RTI TEMPLATE FOR KARNATAKA DEPARTMENT OF PRIMARY & SECONDARY EDUCATION.pdf": "RTI Template for Karnataka Department of Primary & Secondary Education.pdf",
    "RTI TEMPLATE FOR KARNATAKA HIGHER EDUCATION DEPARTMENT.pdf": "RTI Template for Karnataka Higher Education Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA TECHNICAL EDUCATION DEPARTMENT.pdf": "RTI Template for Karnataka Technical Education Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA HEALTH & FAMILY WELFARE DEPARTMENT.pdf": "RTI Template for Karnataka Health & Family Welfare Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA MEDICAL EDUCATION DEPARTMENT.pdf": "RTI Template for Karnataka Medical Education Department.pdf",
    
    # Agriculture & Rural Development
    "RTI TEMPLATE FOR KARNATAKA AGRICULTURE DEPARTMENT.pdf": "RTI Template for Karnataka Agriculture Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA HORTICULTURE DEPARTMENT.pdf": "RTI Template for Karnataka Horticulture Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA ANIMAL HUSBANDRY & VETERINARY SERVICES DEPARTMENT.pdf": "RTI Template for Karnataka Animal Husbandry & Veterinary Services Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA CO-OPERATION DEPARTMENT.pdf": "RTI Template for Karnataka Co-operation Department.pdf",
    
    # Social Welfare
    "RTI TEMPLATE FOR KARNATAKA SOCIAL WELFARE DEPARTMENT.pdf": "RTI Template for Karnataka Social Welfare Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA SCHEDULED CASTES DEVELOPMENT DEPARTMENT.pdf": "RTI Template for Karnataka Scheduled Castes Development Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA SCHEDULED TRIBES WELFARE DEPARTMENT.pdf": "RTI Template for Karnataka Scheduled Tribes Welfare Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA WOMEN & CHILD DEVELOPMENT DEPARTMENT.pdf": "RTI Template for Karnataka Women & Child Development Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA BACKWARD CLASSES WELFARE DEPARTMENT.pdf": "RTI Template for Karnataka Backward Classes Welfare Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA MINORITY WELFARE DEPARTMENT.pdf": "RTI Template for Karnataka Minority Welfare Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA YOUTH & SPORTS DEPARTMENT.pdf": "RTI Template for Karnataka Youth & Sports Department.pdf",
    
    # Commerce & Industry
    "RTI TEMPLATE FOR KARNATAKA INDUSTRIES & COMMERCE DEPARTMENT.pdf": "RTI Template for Karnataka Industries & Commerce Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA LABOUR DEPARTMENT.pdf": "RTI Template for Karnataka Labour Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA FOOD & CIVIL SUPPLIES DEPARTMENT.pdf": "RTI Template for Karnataka Food & Civil Supplies Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA HANDLOOMS & TEXTILES DEPARTMENT.pdf": "RTI Template for Karnataka Handlooms & Textiles Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA MINES & GEOLOGY DEPARTMENT.pdf": "RTI Template for Karnataka Mines & Geology Department.pdf",
    
    # Environment & Resources
    "RTI TEMPLATE FOR KARNATAKA ENVIRONMENT DEPARTMENT.pdf": "RTI Template for Karnataka Environment Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA FOREST DEPARTMENT.pdf": "RTI Template for Karnataka Forest Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA WATER RESOURCES DEPARTMENT.pdf": "RTI Template for Karnataka Water Resources Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA ENERGY DEPARTMENT.pdf": "RTI Template for Karnataka Energy Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA IRRIGATION & CAD DEPARTMENT.pdf": "RTI Template for Karnataka Irrigation & CAD Department.pdf",
    
    # Information & Technology
    "RTI TEMPLATE FOR KARNATAKA INFORMATION TECHNOLOGY DEPARTMENT.pdf": "RTI Template for Karnataka Information Technology Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA INFORMATION & PUBLIC RELATIONS DEPARTMENT.pdf": "RTI Template for Karnataka Information & Public Relations Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA E-GOVERNANCE DEPARTMENT.pdf": "RTI Template for Karnataka e-Governance Department.pdf",
    
    # Culture & Tourism
    "RTI TEMPLATE FOR KARNATAKA TOURISM DEPARTMENT.pdf": "RTI Template for Karnataka Tourism Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA KANNADA & CULTURE DEPARTMENT.pdf": "RTI Template for Karnataka Kannada & Culture Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA ARCHAEOLOGY DEPARTMENT.pdf": "RTI Template for Karnataka Archaeology Department.pdf",
    "RTI TEMPLATE FOR KARNATAKA RELIGIOUS & CHARITABLE ENDOWMENTS DEPARTMENT.pdf": "RTI Template for Karnataka Religious & Charitable Endowments Department.pdf",
}

def copy_templates():
    """Copy all Karnataka RTI templates to the correct location"""
    print("=" * 70)
    print("Copying Karnataka RTI Templates to Department Folders")
    print("=" * 70 + "\n")
    
    if not SOURCE_DIR.exists():
        print(f"[ERROR] Source directory not found: {SOURCE_DIR}")
        return
    
    copied = 0
    skipped = 0
    not_found = 0
    
    # Walk through all category folders in source
    for category_folder in SOURCE_DIR.iterdir():
        if not category_folder.is_dir():
            continue
        
        category_name = category_folder.name
        dest_category_folder = DEST_DIR / category_name
        
        # Create destination folder if it doesn't exist
        dest_category_folder.mkdir(parents=True, exist_ok=True)
        
        print(f"\nProcessing: {category_name}")
        
        # Process each PDF in the category folder
        for pdf_file in category_folder.glob("*.pdf"):
            source_filename = pdf_file.name
            
            # Find matching destination filename
            dest_filename = None
            for source_pattern, dest_pattern in FILENAME_MAPPINGS.items():
                if source_filename.upper() == source_pattern.upper():
                    dest_filename = dest_pattern
                    break
            
            # If no exact match, try to convert format
            if not dest_filename:
                # Convert "RTI TEMPLATE FOR KARNATAKA..." to "RTI Template for Karnataka..."
                dest_filename = source_filename.replace("RTI TEMPLATE FOR KARNATAKA", "RTI Template for Karnataka")
                # Handle special cases
                if "E-GOVERNANCE" in source_filename:
                    dest_filename = source_filename.replace("RTI TEMPLATE FOR KARNATAKA E-GOVERNANCE", "RTI Template for Karnataka e-Governance")
            
            dest_path = dest_category_folder / dest_filename
            
            try:
                # Copy the file
                shutil.copy2(pdf_file, dest_path)
                print(f"  [OK] {source_filename}")
                print(f"    -> {dest_filename}")
                copied += 1
            except Exception as e:
                print(f"  [ERROR] Error copying {source_filename}: {str(e)}")
                skipped += 1
    
    print(f"\n{'=' * 70}")
    print(f"Summary: Copied {copied}, Skipped {skipped}, Not Found {not_found}")
    print(f"{'=' * 70}")
    print(f"\n[SUCCESS] All Karnataka RTI templates have been copied to:")
    print(f"  {DEST_DIR}")

if __name__ == "__main__":
    copy_templates()

