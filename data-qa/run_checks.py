from pathlib import Path
from expectations.checks import (
    load_dataset,
    check_schema,
    check_non_negative,
    check_date_range,
    check_fk_contracts_have_tenant,
)

BASE_DIR = Path(__file__).resolve().parent
CONTRACTS = BASE_DIR / "datasets" / "contracts.csv"
TENANTS   = BASE_DIR / "datasets" / "tenants.csv"

if __name__ == "__main__":
    contracts = load_dataset(CONTRACTS)
    tenants   = load_dataset(TENANTS)

    results = [
        check_schema(contracts, ["id","title","status","amount","tenant_id","start_date","end_date"]),
        check_non_negative(contracts, "amount"),
        check_date_range(contracts, "start_date", "end_date"),
        check_fk_contracts_have_tenant(contracts, tenants),
    ]

    for r in results:
        print(r)

    raise SystemExit(1 if any(not r.passed for r in results) else 0)
