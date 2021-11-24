CALL apoc.meta.nodeTypeProperties( ) yield  propertyTypes, totalObservations
with * where propertyTypes = ["Date"] OR propertyTypes = ["Long"] OR propertyTypes = ["Double"] OR propertyTypes = ["StringArray"]
with sum(totalObservations) AS numTransformations
with numTransformations
CALL apoc.meta.relTypeProperties( ) yield  propertyTypes, totalObservations
with numTransformations, propertyTypes, totalObservations where propertyTypes = ["Date"] OR propertyTypes = ["Long"] OR propertyTypes = ["Double"]
with numTransformations, sum(totalObservations) AS numRelTransformations
return numTransformations + numRelTransformations = 8913 AS outcome