import zipfile, re, os, xml.etree.ElementTree as ET
files=['BankSarthi PRD.docx','BANK SARTHI TRD.docx']
for name in files:
    path=os.path.join(os.getcwd(),name)
    print('\n===',name,'===')
    with zipfile.ZipFile(path) as z:
        xml=z.read('word/document.xml')
    root=ET.fromstring(xml)
    ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    texts=[t.text or '' for t in root.findall('.//w:t',ns)]
    text=''.join(texts)
    text=re.sub(r'\s+',' ',text).strip()
    print(text[:22000])
