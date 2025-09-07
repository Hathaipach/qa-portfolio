# QA Portfolio

[![CI](https://github.com/Hathaipach/qa-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Hathaipach/qa-portfolio/actions/workflows/ci.yml)


Shows how to do **Data Quality** checks with Pandas:
- Schema checks
- Referential integrity
- Business rules (e.g., amount >= 0, date ranges)


Run:
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python run_checks.py

---


## 📦 data-qa/requirements.txt
```txt
pandas==2.2.2
pyarrow==17.0.0