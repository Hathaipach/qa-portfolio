# data-qa/expectations/checks.py
import pandas as pd

class DataCheckResult:
    def __init__(self, name: str, passed: bool, details: str = ""):
        self.name = name
        self.passed = passed
        self.details = details

    def __repr__(self) -> str:
        status = "PASS" if self.passed else "FAIL"
        return f"[{status}] {self.name} - {self.details}"

def load_dataset(path) -> pd.DataFrame:
    return pd.read_csv(path)

def check_schema(df: pd.DataFrame, required_columns: list[str]) -> DataCheckResult:
    missing = [c for c in required_columns if c not in df.columns]
    return DataCheckResult(
        name="schema:required_columns",
        passed=len(missing) == 0,
        details=("missing: " + ", ".join(missing)) if missing else "ok",
    )

def check_non_negative(df: pd.DataFrame, column: str) -> DataCheckResult:
    bad = df[df[column] < 0]
    return DataCheckResult(
        name=f"business:{column}_non_negative",
        passed=bad.empty,
        details=f"{len(bad)} rows < 0" if not bad.empty else "ok",
    )

def check_date_range(df: pd.DataFrame, start_col: str, end_col: str) -> DataCheckResult:
    df2 = df.copy()
    df2[start_col] = pd.to_datetime(df2[start_col])
    df2[end_col] = pd.to_datetime(df2[end_col])
    bad = df2[df2[end_col] < df2[start_col]]
    return DataCheckResult(
        name="business:end_date_after_start",
        passed=bad.empty,
        details=f"{len(bad)} rows end<start" if not bad.empty else "ok",
    )

def check_fk_contracts_have_tenant(contracts: pd.DataFrame, tenants: pd.DataFrame) -> DataCheckResult:
    valid_ids = set(tenants["tenant_id"].unique())
    bad = contracts[~contracts["tenant_id"].isin(valid_ids)]
    return DataCheckResult(
        name="integrity:contract_tenant_fk",
        passed=bad.empty,
        details=f"{len(bad)} rows with unknown tenant_id" if not bad.empty else "ok",
    )
