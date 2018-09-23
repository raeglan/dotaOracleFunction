zip -r oracleFunction *
aws lambda update-function-code --function-name dotaOracleFunction --zip-file fileb://oracleFunction.zip
rm oracleFunction.zip
