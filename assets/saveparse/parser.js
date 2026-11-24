/* @etothepii/satisfactory-file-parser 4.1.2 + pako 2.1.0, MIT; local CommonJS bundle. */
self.SFSaveParser=(function(){const m=[function(module,exports,__r){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__r(1), exports);
__exportStar(__r(21), exports);
__exportStar(__r(121), exports);
__exportStar(__r(122), exports);
__exportStar(__r(123), exports);
__exportStar(__r(23), exports);
__exportStar(__r(111), exports);
__exportStar(__r(22), exports);
__exportStar(__r(110), exports);
__exportStar(__r(2), exports);
__exportStar(__r(124), exports);
__exportStar(__r(3), exports);
__exportStar(__r(7), exports);
__exportStar(__r(4), exports);
__exportStar(__r(125), exports);
__exportStar(__r(10), exports);
__exportStar(__r(20), exports);
__exportStar(__r(109), exports);
__exportStar(__r(126), exports);
__exportStar(__r(127), exports);
__exportStar(__r(114), exports);
__exportStar(__r(128), exports);
__exportStar(__r(108), exports);
__exportStar(__r(113), exports);
__exportStar(__r(78), exports);
__exportStar(__r(116), exports);
__exportStar(__r(115), exports);
__exportStar(__r(25), exports);
__exportStar(__r(8), exports);
__exportStar(__r(118), exports);
__exportStar(__r(119), exports);
__exportStar(__r(112), exports);
__exportStar(__r(129), exports);
__exportStar(__r(42), exports);
__exportStar(__r(43), exports);
__exportStar(__r(107), exports);
__exportStar(__r(44), exports);
__exportStar(__r(45), exports);
__exportStar(__r(49), exports);
__exportStar(__r(50), exports);
__exportStar(__r(51), exports);
__exportStar(__r(53), exports);
__exportStar(__r(54), exports);
__exportStar(__r(55), exports);
__exportStar(__r(56), exports);
__exportStar(__r(87), exports);
__exportStar(__r(57), exports);
__exportStar(__r(58), exports);
__exportStar(__r(85), exports);
__exportStar(__r(59), exports);
__exportStar(__r(88), exports);
__exportStar(__r(60), exports);
__exportStar(__r(62), exports);
__exportStar(__r(63), exports);
__exportStar(__r(86), exports);
__exportStar(__r(89), exports);
__exportStar(__r(90), exports);
__exportStar(__r(52), exports);
__exportStar(__r(130), exports);
__exportStar(__r(82), exports);
__exportStar(__r(84), exports);
__exportStar(__r(131), exports);
__exportStar(__r(65), exports);
__exportStar(__r(92), exports);
__exportStar(__r(95), exports);
__exportStar(__r(96), exports);
__exportStar(__r(99), exports);
__exportStar(__r(100), exports);
__exportStar(__r(101), exports);
__exportStar(__r(102), exports);
__exportStar(__r(103), exports);
__exportStar(__r(94), exports);
__exportStar(__r(104), exports);
__exportStar(__r(91), exports);
__exportStar(__r(105), exports);
__exportStar(__r(9), exports);
__exportStar(__r(73), exports);
__exportStar(__r(69), exports);
__exportStar(__r(47), exports);
__exportStar(__r(117), exports);
__exportStar(__r(17), exports);
__exportStar(__r(120), exports);
__exportStar(__r(61), exports);
__exportStar(__r(93), exports);
__exportStar(__r(19), exports);
__exportStar(__r(18), exports);
__exportStar(__r(81), exports);
__exportStar(__r(106), exports);
__exportStar(__r(66), exports);
__exportStar(__r(67), exports);
__exportStar(__r(97), exports);
__exportStar(__r(98), exports);
__exportStar(__r(13), exports);
__exportStar(__r(12), exports);
__exportStar(__r(15), exports);
__exportStar(__r(68), exports);
__exportStar(__r(71), exports);
__exportStar(__r(5), exports);
__exportStar(__r(16), exports);
__exportStar(__r(6), exports);
__exportStar(__r(46), exports);
__exportStar(__r(48), exports);
__exportStar(__r(11), exports);
__exportStar(__r(72), exports);
__exportStar(__r(14), exports);
__exportStar(__r(83), exports);
__exportStar(__r(74), exports);
__exportStar(__r(75), exports);
__exportStar(__r(76), exports);
__exportStar(__r(70), exports);
__exportStar(__r(77), exports);
__exportStar(__r(79), exports);
__exportStar(__r(80), exports);
__exportStar(__r(132), exports);
__exportStar(__r(64), exports);
__exportStar(__r(24), exports);
//# sourceMappingURL=index.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const blueprint_config_1 = __r(4);
const blueprint_header_1 = __r(10);
const blueprint_reader_1 = __r(20);
const blueprint_writer_1 = __r(109);
const satisfactory_save_1 = __r(115);
const satisfactory_save_header_1 = __r(116);
const save_custom_version_1 = __r(8);
const save_reader_1 = __r(119);
const save_writer_1 = __r(112);
const FSaveObjectVersionData_1 = __r(11);
const ObjectReference_1 = __r(17);
const SaveBodyValidation_1 = __r(120);
class Parser {
    static ParseSave(name, bytes, options) {
        const reader = new save_reader_1.SaveReader(bytes, options?.onProgressCallback);
        reader.context.throwErrors = options?.throwErrors !== undefined ? options.throwErrors : false;
        const header = satisfactory_save_header_1.SatisfactorySaveHeader.Parse(reader);
        const save = new satisfactory_save_1.SatisfactorySave(name, header);
        const roughSaveVersion = save_reader_1.SaveReader.GetApproximateSaveVersion(header.saveVersion);
        if (roughSaveVersion === '<U6') {
            throw new parser_error_1.UnsupportedVersionError('Game Version < U6 is not supported in the parser. Please save the file in a newer game version.');
        }
        const inflateResult = reader.inflateChunks();
        save.compressionInfo = inflateResult.compressionInfo;
        if (options?.onDecompressedSaveBody !== undefined) {
            options.onDecompressedSaveBody(reader.getBuffer());
        }
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            reader.readInt32();
        }
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
            save.objectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
            reader.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(save.objectVersionData.packageFileVersion.ue5Version);
        }
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
            save.saveBodyValidation = SaveBodyValidation_1.SaveBodyValidation.Parse(reader);
        }
        save.levels = reader.readLevels();
        if (reader.getBufferPosition() < reader.getBufferLength()) {
            const countUnresolvedWorldSaveData = reader.readInt32();
            if (countUnresolvedWorldSaveData) {
                save.unresolvedWorldSaveData = [];
                for (let i = 0; i < countUnresolvedWorldSaveData; i++) {
                    save.unresolvedWorldSaveData.push(ObjectReference_1.ObjectReference.read(reader));
                }
            }
        }
        reader.onProgressCallback(reader.getBufferProgress(), 'finished parsing.');
        return save;
    }
    static WriteSave(save, onHeader, onChunk, options) {
        const writer = new save_writer_1.SaveWriter();
        writer.context.saveHeaderType = save.header.saveHeaderType;
        writer.context.saveVersion = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(save.header.saveVersion);
        writer.context.buildVersion = save.header.buildVersion;
        writer.context.mapName = save.header.mapName;
        writer.context.mods = Object.fromEntries(save.header.modMetadata?.Mods?.map(mod => [mod.Reference, mod.Version]) ?? []);
        satisfactory_save_header_1.SatisfactorySaveHeader.Serialize(writer, save.header);
        const posAfterHeader = writer.getBufferPosition();
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            writer.writeInt32(0);
        }
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
            FSaveObjectVersionData_1.FSaveObjectVersionData.write(writer, save.objectVersionData);
            writer.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(save.objectVersionData.packageFileVersion.ue5Version);
        }
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
            SaveBodyValidation_1.SaveBodyValidation.Serialize(writer, save.saveBodyValidation);
        }
        save_writer_1.SaveWriter.WriteLevels(writer, save);
        writer.writeInt32(save.unresolvedWorldSaveData?.length ?? 0);
        for (const actor of save.unresolvedWorldSaveData ?? []) {
            ObjectReference_1.ObjectReference.write(writer, actor);
        }
        writer.endWriting();
        const chunkSummary = writer.generateChunks(save.compressionInfo, posAfterHeader, options?.onBinaryBeforeCompressing ?? (() => { }), onHeader, onChunk);
        return chunkSummary;
    }
    static WriteBlueprintFiles(blueprint, onMainFileHeader, onMainFileChunk, options) {
        const blueprintWriter = new blueprint_writer_1.BlueprintWriter();
        blueprintWriter.context.blueprintConfigVersion = blueprint.config.configVersion;
        blueprintWriter.context.saveVersion = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(blueprint.header.saveVersion);
        blueprintWriter.context.buildVersion = blueprint.header.buildVersion;
        blueprint_header_1.BlueprintHeader.Serialize(blueprintWriter, blueprint.header);
        const saveBodyPos = blueprintWriter.getBufferPosition();
        blueprint_writer_1.BlueprintWriter.SerializeObjects(blueprintWriter, blueprint.objects);
        blueprintWriter.endWriting();
        let binaryChunks = [];
        let binaryHeader;
        const mainFileChunkSummary = blueprintWriter.generateChunks(blueprint.compressionInfo, saveBodyPos, {
            onBinaryBeforeCompressing: options?.onMainFileBinaryBeforeCompressing ?? (() => { }),
            onHeader: onMainFileHeader,
            onChunk: onMainFileChunk
        });
        const configWriter = new blueprint_writer_1.BlueprintConfigWriter();
        configWriter.context.blueprintConfigVersion = blueprint.config.configVersion;
        configWriter.context.saveVersion = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(blueprint.header.saveVersion);
        configWriter.context.buildVersion = blueprint.header.buildVersion;
        blueprint_config_1.BlueprintConfig.Serialize(configWriter, blueprint.config);
        const configFileBinary = configWriter.endWriting();
        return {
            mainFileChunkSummary,
            configFileBinary
        };
    }
    static ParseBlueprintFiles(name, blueprintFile, blueprintConfigFile, options) {
        const blueprintReader = new blueprint_reader_1.BlueprintReader(blueprintFile);
        blueprintReader.context.throwErrors = options?.throwErrors !== undefined ? options.throwErrors : false;
        const header = blueprint_header_1.BlueprintHeader.Parse(blueprintReader);
        const inflateResult = blueprintReader.inflateChunks();
        if (options?.onDecompressedBlueprintBody !== undefined) {
            options.onDecompressedBlueprintBody(inflateResult.inflatedData);
        }
        const blueprintObjects = blueprint_reader_1.BlueprintReader.ParseObjects(blueprintReader);
        const blueprintConfigReader = new blueprint_reader_1.BlueprintConfigReader(blueprintConfigFile);
        blueprintConfigReader.context.saveVersion = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(header.saveVersion);
        const config = blueprint_config_1.BlueprintConfig.Parse(blueprintConfigReader);
        const blueprint = {
            name,
            compressionInfo: blueprintReader.compressionInfo,
            header: header,
            config,
            objects: blueprintObjects
        };
        return blueprint;
    }
}
exports.Parser = Parser;
Parser.JSONStringifyModified = (obj, indent = 0) => JSON.stringify(obj, (key, value) => {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    else if (value === 0 && 1 / value < 0) {
        return '-0';
    }
    return value;
}, indent);
//# sourceMappingURL=parser.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchyVersion = void 0;
var HierarchyVersion;
(function (HierarchyVersion) {
    function CreateOnHeader(version) {
        return {
            header: version,
            level: version,
            object: version
        };
    }
    HierarchyVersion.CreateOnHeader = CreateOnHeader;
    function SetOnLevel(context, version) {
        context.level = version ?? context.header;
        context.object = version ?? context.header;
    }
    HierarchyVersion.SetOnLevel = SetOnLevel;
    function SetOnObject(context, version) {
        context.object = version ?? context.level;
    }
    HierarchyVersion.SetOnObject = SetOnObject;
})(HierarchyVersion || (exports.HierarchyVersion = HierarchyVersion = {}));
//# sourceMappingURL=hierarchical-version-context.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnimplementedError = exports.TimeoutError = exports.CompressionLibraryError = exports.CorruptBlueprintError = exports.CorruptSaveError = exports.UnsupportedVersionError = exports.ParserError = void 0;
class ParserError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
exports.ParserError = ParserError;
class UnsupportedVersionError extends ParserError {
    constructor(message) {
        super('UnsupportedVersionError', message ?? 'This save version is not supported.');
    }
}
exports.UnsupportedVersionError = UnsupportedVersionError;
class CorruptSaveError extends ParserError {
    constructor(message) {
        super('CorruptSaveError', message ?? 'This save data is most likely corrupt.');
    }
}
exports.CorruptSaveError = CorruptSaveError;
class CorruptBlueprintError extends ParserError {
    constructor(message) {
        super('CorruptBlueprintError', message ?? 'This blueprint data is most likely corrupt.');
    }
}
exports.CorruptBlueprintError = CorruptBlueprintError;
class CompressionLibraryError extends ParserError {
    constructor(message) {
        super('CompressionLibraryError', message ?? 'Failed to compress/decompress save data.');
    }
}
exports.CompressionLibraryError = CompressionLibraryError;
class TimeoutError extends ParserError {
    constructor(message) {
        super('TimeoutError', message ?? 'Operation timed out.');
    }
}
exports.TimeoutError = TimeoutError;
class UnimplementedError extends ParserError {
    constructor(message) {
        super('UnimplementedError', message ?? 'Unimplemented Operation.');
    }
}
exports.UnimplementedError = UnimplementedError;
//# sourceMappingURL=parser.error.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintConfig = void 0;
const FLocalUserNetIdBundle_1 = __r(5);
const FPlayerInfoHandle_1 = __r(6);
const col4_1 = __r(9);
const blueprint_config_version_1 = __r(7);
var BlueprintConfig;
(function (BlueprintConfig) {
    BlueprintConfig.Parse = (reader) => {
        const configVersion = reader.readInt32();
        const description = reader.readString();
        const iconID = reader.readInt32();
        const color = col4_1.col4.ParseRGBA(reader);
        reader.context.blueprintConfigVersion = configVersion;
        const config = {
            configVersion,
            description,
            color,
            iconID,
        };
        if (reader.context.blueprintConfigVersion >= blueprint_config_version_1.BlueprintConfigVersion.AddedIconLibraryPath) {
            config.referencedIconLibrary = reader.readString();
            config.iconLibraryType = reader.readString();
        }
        if (reader.context.blueprintConfigVersion == blueprint_config_version_1.BlueprintConfigVersion.AddedLastEditedBy) {
            const count = reader.readInt32();
            config.lastEditedByLegacy = [];
            for (let i = 0; i < count; i++) {
                config.lastEditedByLegacy.push(FLocalUserNetIdBundle_1.FLocalUserNetIdBundle.read(reader));
            }
        }
        else if (reader.context.blueprintConfigVersion >= blueprint_config_version_1.BlueprintConfigVersion.RemovedFilteredProfanityName) {
            config.lastEditedBy = FPlayerInfoHandle_1.FPlayerInfoHandle.read(reader);
        }
        return config;
    };
    BlueprintConfig.Serialize = (writer, config) => {
        writer.writeInt32(config.configVersion);
        writer.writeString(config.description);
        writer.writeInt32(config.iconID);
        col4_1.col4.SerializeRGBA(writer, config.color);
        if (config.configVersion >= blueprint_config_version_1.BlueprintConfigVersion.AddedIconLibraryPath) {
            writer.writeString(config.referencedIconLibrary ?? '');
            writer.writeString(config.iconLibraryType ?? '');
        }
        if (config.configVersion == blueprint_config_version_1.BlueprintConfigVersion.AddedLastEditedBy) {
            writer.writeInt32(config.lastEditedByLegacy.length);
            for (const account of config.lastEditedByLegacy) {
                FLocalUserNetIdBundle_1.FLocalUserNetIdBundle.write(writer, account);
            }
        }
        else if (config.configVersion >= blueprint_config_version_1.BlueprintConfigVersion.RemovedFilteredProfanityName) {
            FPlayerInfoHandle_1.FPlayerInfoHandle.write(writer, config.lastEditedBy);
        }
    };
})(BlueprintConfig || (exports.BlueprintConfig = BlueprintConfig = {}));
//# sourceMappingURL=blueprint-config.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLocalUserNetIdBundle = void 0;
var FLocalUserNetIdBundle;
(function (FLocalUserNetIdBundle) {
    function read(reader) {
        return {
            accountId: reader.readString(),
            displayName: reader.readString(),
            platformName: reader.readString()
        };
    }
    FLocalUserNetIdBundle.read = read;
    function write(writer, customVersion) {
        writer.writeString(customVersion.accountId);
        writer.writeString(customVersion.displayName);
        writer.writeString(customVersion.platformName);
    }
    FLocalUserNetIdBundle.write = write;
})(FLocalUserNetIdBundle || (exports.FLocalUserNetIdBundle = FLocalUserNetIdBundle = {}));
;
//# sourceMappingURL=FLocalUserNetIdBundle.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPlayerInfoHandle = void 0;
const blueprint_config_version_1 = __r(7);
const save_custom_version_1 = __r(8);
var FPlayerInfoHandle;
(function (FPlayerInfoHandle) {
    function read(reader) {
        const handle = {
            serviceProvider: 0,
            playerInfoTableIndex: 0
        };
        if (reader.context.saveVersion.object < save_custom_version_1.SaveCustomVersion.NewPlayerInfoHandleSerializationFormat) {
            handle.serviceProvider = reader.readUint8();
            handle.playerInfoTableIndex = reader.readUint8();
        }
        else if ((reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.NewPlayerInfoHandleSerializationFormat)
            || reader.context.blueprintConfigVersion >= blueprint_config_version_1.BlueprintConfigVersion.RemovedFilteredProfanityName) {
            handle.serviceProvider = reader.readUint8();
            handle.playerInfoTableIndex = reader.readInt32();
        }
        return handle;
    }
    FPlayerInfoHandle.read = read;
    function write(writer, handle) {
        if (writer.context.saveVersion.object < save_custom_version_1.SaveCustomVersion.NewPlayerInfoHandleSerializationFormat) {
            writer.writeUint8(handle.serviceProvider);
            writer.writeUint8(handle.playerInfoTableIndex);
        }
        else if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.NewPlayerInfoHandleSerializationFormat) {
            writer.writeUint8(handle.serviceProvider);
            writer.writeInt32(handle.playerInfoTableIndex);
        }
    }
    FPlayerInfoHandle.write = write;
})(FPlayerInfoHandle || (exports.FPlayerInfoHandle = FPlayerInfoHandle = {}));
;
//# sourceMappingURL=FPlayerInfoHandle.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintConfigVersion = void 0;
var BlueprintConfigVersion;
(function (BlueprintConfigVersion) {
    BlueprintConfigVersion[BlueprintConfigVersion["InitialVersion"] = 0] = "InitialVersion";
    BlueprintConfigVersion[BlueprintConfigVersion["AddedMD5Hash"] = 1] = "AddedMD5Hash";
    BlueprintConfigVersion[BlueprintConfigVersion["RemovedMD5Hash"] = 2] = "RemovedMD5Hash";
    BlueprintConfigVersion[BlueprintConfigVersion["AddedIconLibraryPath"] = 3] = "AddedIconLibraryPath";
    BlueprintConfigVersion[BlueprintConfigVersion["AddedLastEditedBy"] = 4] = "AddedLastEditedBy";
    BlueprintConfigVersion[BlueprintConfigVersion["AddedFilteredProfanityName"] = 5] = "AddedFilteredProfanityName";
    BlueprintConfigVersion[BlueprintConfigVersion["RemovedFilteredProfanityName"] = 6] = "RemovedFilteredProfanityName";
    BlueprintConfigVersion[BlueprintConfigVersion["VersionPlusOne"] = 7] = "VersionPlusOne";
    BlueprintConfigVersion[BlueprintConfigVersion["LatestVersion"] = 6] = "LatestVersion";
})(BlueprintConfigVersion || (exports.BlueprintConfigVersion = BlueprintConfigVersion = {}));
//# sourceMappingURL=blueprint-config-version.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCustomVersion = void 0;
var SaveCustomVersion;
(function (SaveCustomVersion) {
    SaveCustomVersion[SaveCustomVersion["BeforeCustomVersionWasAdded"] = 0] = "BeforeCustomVersionWasAdded";
    SaveCustomVersion[SaveCustomVersion["DROPPED_StoreTransform"] = 1] = "DROPPED_StoreTransform";
    SaveCustomVersion[SaveCustomVersion["DROPPED_ChangeObjectHeader"] = 2] = "DROPPED_ChangeObjectHeader";
    SaveCustomVersion[SaveCustomVersion["DROPPED_PropertyTagsAsStrings"] = 3] = "DROPPED_PropertyTagsAsStrings";
    SaveCustomVersion[SaveCustomVersion["DROPPED_StoreVehiclesBodyState"] = 4] = "DROPPED_StoreVehiclesBodyState";
    SaveCustomVersion[SaveCustomVersion["DROPPED_ActorPlacedInLevelSaved"] = 5] = "DROPPED_ActorPlacedInLevelSaved";
    SaveCustomVersion[SaveCustomVersion["DROPPED_MovedActorOuter"] = 6] = "DROPPED_MovedActorOuter";
    SaveCustomVersion[SaveCustomVersion["DROPPED_PowerConnectionComponents"] = 7] = "DROPPED_PowerConnectionComponents";
    SaveCustomVersion[SaveCustomVersion["DROPPED_SerializeTrainTimetable"] = 8] = "DROPPED_SerializeTrainTimetable";
    SaveCustomVersion[SaveCustomVersion["DROPPED_FactoryConnectionWorldToLocal"] = 9] = "DROPPED_FactoryConnectionWorldToLocal";
    SaveCustomVersion[SaveCustomVersion["DROPPED_CircuitObjects"] = 10] = "DROPPED_CircuitObjects";
    SaveCustomVersion[SaveCustomVersion["DROPPED_DockingStationSingleInventory"] = 11] = "DROPPED_DockingStationSingleInventory";
    SaveCustomVersion[SaveCustomVersion["DROPPED_SavingBuildShortcuts"] = 12] = "DROPPED_SavingBuildShortcuts";
    SaveCustomVersion[SaveCustomVersion["DROPPED_GamePhaseManagerAdded"] = 13] = "DROPPED_GamePhaseManagerAdded";
    SaveCustomVersion[SaveCustomVersion["DROPPED_RemovedRelativeTransformsFromConnectionComponents"] = 14] = "DROPPED_RemovedRelativeTransformsFromConnectionComponents";
    SaveCustomVersion[SaveCustomVersion["DROPPED_MCP_RestoreLostPawn"] = 15] = "DROPPED_MCP_RestoreLostPawn";
    SaveCustomVersion[SaveCustomVersion["DROPPED_WireSpanFromConnnectionComponents"] = 16] = "DROPPED_WireSpanFromConnnectionComponents";
    SaveCustomVersion[SaveCustomVersion["DROPPED_RenamedSaveSessionId"] = 17] = "DROPPED_RenamedSaveSessionId";
    SaveCustomVersion[SaveCustomVersion["ChangedGeoThermalGeneratorSaved"] = 18] = "ChangedGeoThermalGeneratorSaved";
    SaveCustomVersion[SaveCustomVersion["OverwriteOldRailroadData"] = 19] = "OverwriteOldRailroadData";
    SaveCustomVersion[SaveCustomVersion["ResetFactoryLegs"] = 20] = "ResetFactoryLegs";
    SaveCustomVersion[SaveCustomVersion["SaveFileIsCompressed"] = 21] = "SaveFileIsCompressed";
    SaveCustomVersion[SaveCustomVersion["BU3SaveCompatibility"] = 22] = "BU3SaveCompatibility";
    SaveCustomVersion[SaveCustomVersion["BuildingColorConversion"] = 23] = "BuildingColorConversion";
    SaveCustomVersion[SaveCustomVersion["RescuedFriendDoggos"] = 24] = "RescuedFriendDoggos";
    SaveCustomVersion[SaveCustomVersion["CheckPickedUpItems"] = 25] = "CheckPickedUpItems";
    SaveCustomVersion[SaveCustomVersion["PerInstanceCustomColors"] = 26] = "PerInstanceCustomColors";
    SaveCustomVersion[SaveCustomVersion["DoubleRampPositioning"] = 27] = "DoubleRampPositioning";
    SaveCustomVersion[SaveCustomVersion["TrainBlueprintClassAdded"] = 28] = "TrainBlueprintClassAdded";
    SaveCustomVersion[SaveCustomVersion["AddedSublevelStreaming"] = 29] = "AddedSublevelStreaming";
    SaveCustomVersion[SaveCustomVersion["AddedResourceSinkTrack"] = 30] = "AddedResourceSinkTrack";
    SaveCustomVersion[SaveCustomVersion["AddedColoringSupportToConcretePillars"] = 31] = "AddedColoringSupportToConcretePillars";
    SaveCustomVersion[SaveCustomVersion["AddedResourceSinkTrack2"] = 32] = "AddedResourceSinkTrack2";
    SaveCustomVersion[SaveCustomVersion["AddedCachedLocationsForWire"] = 33] = "AddedCachedLocationsForWire";
    SaveCustomVersion[SaveCustomVersion["ReworkedSplittersAndMergers"] = 34] = "ReworkedSplittersAndMergers";
    SaveCustomVersion[SaveCustomVersion["ReworkedProductivityMonitor"] = 35] = "ReworkedProductivityMonitor";
    SaveCustomVersion[SaveCustomVersion["NativizedShoppingList"] = 36] = "NativizedShoppingList";
    SaveCustomVersion[SaveCustomVersion["UnrealEngine5"] = 37] = "UnrealEngine5";
    SaveCustomVersion[SaveCustomVersion["IntroducedWorldPartition"] = 38] = "IntroducedWorldPartition";
    SaveCustomVersion[SaveCustomVersion["DroneActionRefactor"] = 39] = "DroneActionRefactor";
    SaveCustomVersion[SaveCustomVersion["MultipleWireMeshRefactor"] = 40] = "MultipleWireMeshRefactor";
    SaveCustomVersion[SaveCustomVersion["SwitchTo64BitSaveArchive"] = 41] = "SwitchTo64BitSaveArchive";
    SaveCustomVersion[SaveCustomVersion["ResetBrokenBlueprintSplines"] = 42] = "ResetBrokenBlueprintSplines";
    SaveCustomVersion[SaveCustomVersion["RefactoredInventoryItemState"] = 43] = "RefactoredInventoryItemState";
    SaveCustomVersion[SaveCustomVersion["AddedPaintFinishes"] = 44] = "AddedPaintFinishes";
    SaveCustomVersion[SaveCustomVersion["NormalizeChainSplineArriveAndLeave"] = 45] = "NormalizeChainSplineArriveAndLeave";
    SaveCustomVersion[SaveCustomVersion["Version1"] = 46] = "Version1";
    SaveCustomVersion[SaveCustomVersion["PoleRefactor"] = 47] = "PoleRefactor";
    SaveCustomVersion[SaveCustomVersion["LightweightBuildableSubsystemWritesRuntimeVersion"] = 48] = "LightweightBuildableSubsystemWritesRuntimeVersion";
    SaveCustomVersion[SaveCustomVersion["SerializeObjectFlags"] = 49] = "SerializeObjectFlags";
    SaveCustomVersion[SaveCustomVersion["BackToBackRailroadSwitches"] = 50] = "BackToBackRailroadSwitches";
    SaveCustomVersion[SaveCustomVersion["SerializePerStreamableLevelTOCVersion"] = 51] = "SerializePerStreamableLevelTOCVersion";
    SaveCustomVersion[SaveCustomVersion["RailroadTrackConnectionCleanup"] = 52] = "RailroadTrackConnectionCleanup";
    SaveCustomVersion[SaveCustomVersion["SerializeDataPackageVersionAndCustomVersions"] = 53] = "SerializeDataPackageVersionAndCustomVersions";
    SaveCustomVersion[SaveCustomVersion["DROPPED_RailroadSubsystemThirdRailConnectionsCleanup"] = 54] = "DROPPED_RailroadSubsystemThirdRailConnectionsCleanup";
    SaveCustomVersion[SaveCustomVersion["RailroadSubsystemThirdRailConnectionsCleanupRedone"] = 55] = "RailroadSubsystemThirdRailConnectionsCleanupRedone";
    SaveCustomVersion[SaveCustomVersion["UnlockAvailableItemDescriptorsForPickedUpItems"] = 56] = "UnlockAvailableItemDescriptorsForPickedUpItems";
    SaveCustomVersion[SaveCustomVersion["NewPlayerInfoHandleSerializationFormat"] = 57] = "NewPlayerInfoHandleSerializationFormat";
    SaveCustomVersion[SaveCustomVersion["FixNewPlayerInfoHandleSerializationFormat"] = 58] = "FixNewPlayerInfoHandleSerializationFormat";
    SaveCustomVersion[SaveCustomVersion["VersionPlusOne"] = 59] = "VersionPlusOne";
    SaveCustomVersion[SaveCustomVersion["LatestVersion"] = 58] = "LatestVersion";
})(SaveCustomVersion || (exports.SaveCustomVersion = SaveCustomVersion = {}));
;
//# sourceMappingURL=save-custom-version.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.col4 = void 0;
var col4;
(function (col4) {
    col4.SerializeRGBA = (writer, value) => {
        writer.writeFloat32(value.r);
        writer.writeFloat32(value.g);
        writer.writeFloat32(value.b);
        writer.writeFloat32(value.a);
    };
    col4.ParseRGBA = (reader) => {
        return {
            r: reader.readFloat32(),
            g: reader.readFloat32(),
            b: reader.readFloat32(),
            a: reader.readFloat32(),
        };
    };
    col4.SerializeBGRA = (writer, value) => {
        writer.writeByte(value.b);
        writer.writeByte(value.g);
        writer.writeByte(value.r);
        writer.writeByte(value.a);
    };
    col4.ParseBGRA = (reader) => {
        return {
            b: reader.readByte(),
            g: reader.readByte(),
            r: reader.readByte(),
            a: reader.readByte(),
        };
    };
})(col4 || (exports.col4 = col4 = {}));
//# sourceMappingURL=col4.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintHeader = void 0;
const hierarchical_version_context_1 = __r(2);
const save_custom_version_1 = __r(8);
const FSaveObjectVersionData_1 = __r(11);
const ObjectReference_1 = __r(17);
const vec3_1 = __r(18);
var BlueprintHeader;
(function (BlueprintHeader) {
    BlueprintHeader.Parse = (reader) => {
        const headerVersion = reader.readInt32();
        const saveVersion = reader.readInt32();
        const buildVersion = reader.readInt32();
        const designerDimension = vec3_1.vec3.ParseInt(reader);
        reader.context.headerVersion = headerVersion;
        reader.context.saveVersion = {
            header: saveVersion,
            level: saveVersion,
            object: saveVersion
        };
        reader.context.buildVersion = buildVersion;
        let itemTypeCount = reader.readInt32();
        const itemCosts = new Array(itemTypeCount).fill([{ levelName: '', pathName: '' }, 0]);
        for (let i = 0; i < itemTypeCount; i++) {
            let itemPathName = ObjectReference_1.ObjectReference.read(reader);
            let itemCount = reader.readInt32();
            itemCosts[i] = [itemPathName, itemCount];
        }
        let recipeCount = reader.readInt32();
        const recipeReferences = new Array(recipeCount).fill({ levelName: '', pathName: '' });
        for (let i = 0; i < recipeCount; i++) {
            const recipeName = ObjectReference_1.ObjectReference.read(reader);
            recipeReferences[i] = recipeName;
        }
        const header = {
            headerVersion,
            saveVersion,
            buildVersion,
            designerDimension,
            recipeReferences,
            itemCosts
        };
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
            header.objectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
            reader.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(header.objectVersionData.packageFileVersion.ue5Version);
        }
        return header;
    };
    BlueprintHeader.Serialize = (writer, header) => {
        writer.writeInt32(header.headerVersion);
        writer.writeInt32(header.saveVersion);
        writer.writeInt32(header.buildVersion);
        let dimensions = [
            header.designerDimension?.x ?? 4,
            header.designerDimension?.y ?? 4,
            header.designerDimension?.z ?? 4,
        ].map(dim => dim < 4 ? 4 : dim);
        writer.writeInt32(dimensions[0]);
        writer.writeInt32(dimensions[1]);
        writer.writeInt32(dimensions[2]);
        writer.writeInt32(header.itemCosts.length);
        for (const itemCost of header.itemCosts) {
            ObjectReference_1.ObjectReference.write(writer, itemCost[0]);
            writer.writeInt32(itemCost[1]);
        }
        writer.writeInt32(header.recipeReferences.length);
        for (const recipeReference of header.recipeReferences) {
            ObjectReference_1.ObjectReference.write(writer, recipeReference);
        }
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
            FSaveObjectVersionData_1.FSaveObjectVersionData.write(writer, header.objectVersionData);
            writer.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(header.objectVersionData.packageFileVersion.ue5Version);
        }
    };
})(BlueprintHeader || (exports.BlueprintHeader = BlueprintHeader = {}));
//# sourceMappingURL=blueprint-header.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSaveObjectVersionData = void 0;
const FCustomVersionContainer_1 = __r(12);
const FEngineVersion_1 = __r(15);
const FPackageFileVersion_1 = __r(16);
var FSaveObjectVersionData;
(function (FSaveObjectVersionData) {
    FSaveObjectVersionData.read = (reader) => {
        return {
            saveObjectVersionDataVersion: reader.readUint32(),
            packageFileVersion: FPackageFileVersion_1.FPackageFileVersion.read(reader),
            licenceVersion: reader.readInt32(),
            engineVersion: FEngineVersion_1.FEngineVersion.read(reader),
            customVersionContainer: FCustomVersionContainer_1.FCustomVersionContainer.read(reader)
        };
    };
    FSaveObjectVersionData.write = (writer, data) => {
        writer.writeUint32(data.saveObjectVersionDataVersion);
        FPackageFileVersion_1.FPackageFileVersion.write(writer, data.packageFileVersion);
        writer.writeInt32(data.licenceVersion);
        FEngineVersion_1.FEngineVersion.write(writer, data.engineVersion);
        FCustomVersionContainer_1.FCustomVersionContainer.write(writer, data.customVersionContainer);
    };
})(FSaveObjectVersionData || (exports.FSaveObjectVersionData = FSaveObjectVersionData = {}));
;
//# sourceMappingURL=FSaveObjectVersionData.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCustomVersionContainer = void 0;
const FCustomVersion_1 = __r(13);
var FCustomVersionContainer;
(function (FCustomVersionContainer) {
    FCustomVersionContainer.read = (reader) => {
        const count = reader.readInt32();
        const versions = new Array(count).fill(0).map(element => FCustomVersion_1.FCustomVersion.read(reader));
        return {
            versions
        };
    };
    FCustomVersionContainer.write = (writer, customVersionContainer) => {
        writer.writeInt32(customVersionContainer.versions.length);
        for (const version of customVersionContainer.versions) {
            FCustomVersion_1.FCustomVersion.write(writer, version);
        }
    };
})(FCustomVersionContainer || (exports.FCustomVersionContainer = FCustomVersionContainer = {}));
;
//# sourceMappingURL=FCustomVersionContainer.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCustomVersion = void 0;
const GUID_1 = __r(14);
var FCustomVersion;
(function (FCustomVersion) {
    function read(reader) {
        return {
            guid: GUID_1.GUID.read(reader),
            version: reader.readInt32()
        };
    }
    FCustomVersion.read = read;
    function write(writer, customVersion) {
        GUID_1.GUID.write(writer, customVersion.guid);
        writer.writeInt32(customVersion.version);
    }
    FCustomVersion.write = write;
})(FCustomVersion || (exports.FCustomVersion = FCustomVersion = {}));
;
//# sourceMappingURL=FCustomVersion.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUID = void 0;
var GUID;
(function (GUID) {
    GUID.read = (reader) => {
        return [
            reader.readUint32(),
            reader.readUint32(),
            reader.readUint32(),
            reader.readUint32(),
        ];
    };
    GUID.write = (writer, guid) => {
        writer.writeUint32(guid[0]);
        writer.writeUint32(guid[1]);
        writer.writeUint32(guid[2]);
        writer.writeUint32(guid[3]);
    };
})(GUID || (exports.GUID = GUID = {}));
;
//# sourceMappingURL=GUID.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEngineVersion = void 0;
var FEngineVersion;
(function (FEngineVersion) {
    FEngineVersion.read = (reader) => {
        return {
            major: reader.readUint16(),
            minor: reader.readUint16(),
            patch: reader.readUint16(),
            changelist: reader.readUint32(),
            branch: reader.readString()
        };
    };
    FEngineVersion.write = (writer, engineVersion) => {
        writer.writeUint16(engineVersion.major);
        writer.writeUint16(engineVersion.minor);
        writer.writeUint16(engineVersion.patch);
        writer.writeUint32(engineVersion.changelist);
        writer.writeString(engineVersion.branch);
    };
})(FEngineVersion || (exports.FEngineVersion = FEngineVersion = {}));
;
//# sourceMappingURL=FEngineVersion.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPackageFileVersion = void 0;
var FPackageFileVersion;
(function (FPackageFileVersion) {
    FPackageFileVersion.read = (reader) => {
        return {
            ue4Version: reader.readInt32(),
            ue5Version: reader.readInt32(),
        };
    };
    FPackageFileVersion.write = (writer, packageFileVersion) => {
        writer.writeInt32(packageFileVersion.ue4Version);
        writer.writeInt32(packageFileVersion.ue5Version);
    };
})(FPackageFileVersion || (exports.FPackageFileVersion = FPackageFileVersion = {}));
;
//# sourceMappingURL=FPackageFileVersion.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectReference = void 0;
var ObjectReference;
(function (ObjectReference) {
    ObjectReference.read = (reader) => {
        return {
            levelName: reader.readString(),
            pathName: reader.readString()
        };
    };
    ObjectReference.write = (writer, ref) => {
        writer.writeString(ref.levelName);
        writer.writeString(ref.pathName);
    };
    ObjectReference.IsEqual = (ref1, ref2) => ref1.levelName === ref2.levelName && ref1.pathName === ref2.pathName;
})(ObjectReference || (exports.ObjectReference = ObjectReference = {}));
;
//# sourceMappingURL=ObjectReference.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec3 = void 0;
const vec2_1 = __r(19);
var vec3;
(function (vec3) {
    vec3.Parse = (reader) => {
        return {
            ...(vec2_1.vec2.Parse(reader)),
            z: reader.readDouble()
        };
    };
    vec3.Serialize = (writer, vec) => {
        vec2_1.vec2.Serialize(writer, vec);
        writer.writeDouble(vec.z);
    };
    vec3.ParseInt = (reader) => {
        return {
            x: reader.readInt32(),
            y: reader.readInt32(),
            z: reader.readInt32()
        };
    };
    vec3.SerializeInt = (writer, vec) => {
        writer.writeInt32(vec.x);
        writer.writeInt32(vec.y);
        writer.writeInt32(vec.z);
    };
    vec3.ParseF = (reader) => {
        return {
            ...(vec2_1.vec2.ParseF(reader)),
            z: reader.readFloat32()
        };
    };
    vec3.SerializeF = (writer, vec) => {
        vec2_1.vec2.SerializeF(writer, vec);
        writer.writeFloat32(vec.z);
    };
    vec3.sub = (other, vec) => ({ x: other.x - vec.x, y: other.y - vec.y, z: other.z - vec.z });
    vec3.add = (vec, other) => ({ x: vec.x + other.x, y: vec.y + other.y, z: vec.z + other.z });
    vec3.length = (vec) => Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2);
    vec3.mult = (vec, scale) => ({ x: vec.x * scale, y: vec.y * scale, z: vec.z * scale });
    vec3.norm = (vec) => vec3.mult(vec, 1. / vec3.length(vec));
})(vec3 || (exports.vec3 = vec3 = {}));
//# sourceMappingURL=vec3.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = void 0;
var vec2;
(function (vec2) {
    vec2.Parse = (reader) => {
        return {
            x: reader.readDouble(),
            y: reader.readDouble(),
        };
    };
    vec2.Serialize = (writer, vec) => {
        writer.writeDouble(vec.x);
        writer.writeDouble(vec.y);
    };
    vec2.ParseF = (reader) => {
        return {
            x: reader.readFloat32(),
            y: reader.readFloat32(),
        };
    };
    vec2.SerializeF = (writer, vec) => {
        writer.writeFloat32(vec.x);
        writer.writeFloat32(vec.y);
    };
})(vec2 || (exports.vec2 = vec2 = {}));
//# sourceMappingURL=vec2.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintConfigReader = exports.BlueprintReader = void 0;
const alignment_enum_1 = __r(21);
const context_reader_1 = __r(22);
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const EUnrealEngineObjectUE5Version_1 = __r(24);
const save_body_chunks_1 = __r(25);
const toc_blob_1 = __r(42);
const SaveComponent_1 = __r(43);
const SaveEntity_1 = __r(107);
class BlueprintReader extends context_reader_1.ContextReader {
    constructor(bluePrintBuffer) {
        super(bluePrintBuffer, alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.compressionInfo = {
            packageFileTag: 0,
            maxUncompressedChunkContentSize: 0,
            chunkHeaderVersion: save_body_chunks_1.SaveBodyChunks.HEADER_V2
        };
        this.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.INITIAL_VERSION);
    }
    inflateChunks() {
        const result = save_body_chunks_1.SaveBodyChunks.DecompressChunks(this.fileBuffer.slice(this.currentByte), this.alignment);
        this.compressionInfo = result.compressionInfo;
        this.currentByte = 0;
        this.fileBuffer = result.uncompressedData.buffer;
        this.maxByte = this.fileBuffer.byteLength;
        this.bufferView = new DataView(this.fileBuffer);
        const totalBodyRestSize = this.readInt32();
        if (result.uncompressedData.byteLength !== totalBodyRestSize + 4) {
            throw new parser_error_1.CorruptBlueprintError(`Possibly corrupt. Indicated size of total blueprint body (${totalBodyRestSize + 4}) does not match the uncompressed real size of ${result.uncompressedData.byteLength}.`);
        }
        return {
            inflatedData: this.fileBuffer
        };
    }
    static ParseObjects(reader) {
        const objectHeadersBinarySize = reader.readInt32();
        let objects = [];
        toc_blob_1.TOCBlob.Read(reader, objects);
        const someChecksumThing = reader.readInt32();
        BlueprintReader.ReadBlueprintObjectContents(reader, objects, 0);
        reader.getBufferPosition();
        return objects;
    }
    static ReadBlueprintObjectContents(reader, objectsList, buildVersion) {
        const countEntities = reader.readInt32();
        for (let i = 0; i < countEntities; i++) {
            const len = reader.readInt32();
            if (len === 0) {
                throw new parser_error_1.CorruptSaveError(`check number is a wrong value (${len}). This normally indicates a corrupt entity or blueprint.`);
            }
            const obj = objectsList[i];
            if ((0, SaveEntity_1.isSaveEntity)(obj)) {
                SaveEntity_1.SaveEntity.ParseData(obj, len, reader, obj.typePath);
            }
            else if ((0, SaveComponent_1.isSaveComponent)(obj)) {
                SaveComponent_1.SaveComponent.ParseData(obj, len, reader, obj.typePath);
            }
        }
    }
}
exports.BlueprintReader = BlueprintReader;
class BlueprintConfigReader extends context_reader_1.ContextReader {
    constructor(bluePrintConfigBuffer) {
        super(bluePrintConfigBuffer, alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.bluePrintConfigBuffer = bluePrintConfigBuffer;
        this.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.INITIAL_VERSION);
    }
}
exports.BlueprintConfigReader = BlueprintConfigReader;
//# sourceMappingURL=blueprint-reader.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alignment = void 0;
var Alignment;
(function (Alignment) {
    Alignment[Alignment["BIG_ENDIAN"] = 0] = "BIG_ENDIAN";
    Alignment[Alignment["LITTLE_ENDIAN"] = 1] = "LITTLE_ENDIAN";
})(Alignment || (exports.Alignment = Alignment = {}));
//# sourceMappingURL=alignment.enum.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextReader = void 0;
const byte_reader_class_1 = __r(23);
class ContextReader extends byte_reader_class_1.ByteReader {
    constructor() {
        super(...arguments);
        this.context = {};
    }
}
exports.ContextReader = ContextReader;
;
//# sourceMappingURL=context-reader.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteReader = void 0;
const parser_error_1 = __r(3);
const alignment_enum_1 = __r(21);
class ByteReader {
    constructor(fileBuffer, alignment) {
        this.currentByte = 0;
        this.handledByte = 0;
        this.maxByte = 0;
        this.getBufferPosition = () => this.currentByte;
        this.getBufferSlice = (begin, end) => this.bufferView.buffer.slice(begin, end);
        this.getBufferProgress = () => this.currentByte / this.bufferView.buffer.byteLength;
        this.getBufferLength = () => this.bufferView.buffer.byteLength;
        this.getBuffer = () => this.bufferView.buffer;
        this.alignment = alignment;
        this.reset(fileBuffer);
    }
    reset(newFileBuffer) {
        this.fileBuffer = newFileBuffer;
        this.bufferView = new DataView(this.fileBuffer, 0, this.fileBuffer.byteLength);
        this.maxByte = newFileBuffer.byteLength;
        this.currentByte = 0;
        this.handledByte = 0;
    }
    skipBytes(byteLength = 1) {
        this.currentByte += byteLength;
        return;
    }
    jumpTo(pos) {
        const count = pos - this.getBufferPosition();
        this.skipBytes(count);
    }
    readByte() {
        return this.readUint8();
    }
    readBytes(count) {
        return new Uint8Array(new Array(count).fill(0).map(pl => this.readByte()));
    }
    bytesToHexRepresentation(bytes) {
        return bytes.map(byte => ('0' + byte.toString(16)).slice(-2));
    }
    readHex(byteLength, hexSeparator = ' ') {
        return this.bytesToHexRepresentation(Array.from(this.readBytes(byteLength))).join(hexSeparator);
    }
    readInt8() {
        let data = this.bufferView.getInt8(this.currentByte++);
        return data;
    }
    readUint8() {
        let data = this.bufferView.getUint8(this.currentByte++);
        return data;
    }
    readInt16() {
        let data = this.bufferView.getInt16(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 2;
        return data;
    }
    readUint16() {
        let data = this.bufferView.getUint16(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 2;
        return data;
    }
    readInt32() {
        let data = this.bufferView.getInt32(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
        return data;
    }
    readInt32Zero() {
        this.readInt32();
    }
    readUint32() {
        let data = this.bufferView.getUint32(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
        return data;
    }
    readLong() {
        let data = this.bufferView.getBigInt64(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
        return data;
    }
    readInt64() {
        return this.readLong();
    }
    readUint64() {
        let data = this.bufferView.getBigUint64(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
        return data;
    }
    readFloat32() {
        let data = this.bufferView.getFloat32(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
        return data;
    }
    readDouble() {
        let data = this.bufferView.getFloat64(this.currentByte, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
        return data;
    }
    readString() {
        let strLength = this.readInt32();
        if (strLength === 0) {
            return '';
        }
        if (strLength > (this.bufferView.buffer.byteLength - this.currentByte)) {
            let errorMessage = `Cannot read string of length ${strLength} at position ${this.currentByte} as it exceeds the end at ${this.bufferView.buffer.byteLength}`;
            throw new Error(errorMessage);
        }
        if (strLength < 0) {
            const string = new Array(-strLength - 1).fill('').map(c => String.fromCodePoint(this.readUint16()));
            this.currentByte += 2;
            return string.join('');
        }
        try {
            const string = new Array(strLength - 1).fill('').map(c => String.fromCodePoint(this.readUint8()));
            this.currentByte += 1;
            return string.join('');
        }
        catch (error) {
            throw new parser_error_1.CorruptSaveError(`Cannot read UTF8 string of length ${strLength} at position ${this.currentByte}.`);
        }
    }
}
exports.ByteReader = ByteReader;
//# sourceMappingURL=byte-reader.class.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUnrealEngineObjectUE5Version = void 0;
var EUnrealEngineObjectUE5Version;
(function (EUnrealEngineObjectUE5Version) {
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["INITIAL_VERSION"] = 1000] = "INITIAL_VERSION";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["NAMES_REFERENCED_FROM_EXPORT_DATA"] = 1001] = "NAMES_REFERENCED_FROM_EXPORT_DATA";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["PAYLOAD_TOC"] = 1002] = "PAYLOAD_TOC";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["OPTIONAL_RESOURCES"] = 1003] = "OPTIONAL_RESOURCES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["LARGE_WORLD_COORDINATES"] = 1004] = "LARGE_WORLD_COORDINATES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["REMOVE_OBJECT_EXPORT_PACKAGE_GUID"] = 1005] = "REMOVE_OBJECT_EXPORT_PACKAGE_GUID";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["TRACK_OBJECT_EXPORT_IS_INHERITED"] = 1006] = "TRACK_OBJECT_EXPORT_IS_INHERITED";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["FSOFTOBJECTPATH_REMOVE_ASSET_PATH_FNAMES"] = 1007] = "FSOFTOBJECTPATH_REMOVE_ASSET_PATH_FNAMES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["ADD_SOFTOBJECTPATH_LIST"] = 1008] = "ADD_SOFTOBJECTPATH_LIST";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["DATA_RESOURCES"] = 1009] = "DATA_RESOURCES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["SCRIPT_SERIALIZATION_OFFSET"] = 1010] = "SCRIPT_SERIALIZATION_OFFSET";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["PROPERTY_TAG_EXTENSION_AND_OVERRIDABLE_SERIALIZATION"] = 1011] = "PROPERTY_TAG_EXTENSION_AND_OVERRIDABLE_SERIALIZATION";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["PROPERTY_TAG_COMPLETE_TYPE_NAME"] = 1012] = "PROPERTY_TAG_COMPLETE_TYPE_NAME";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["ASSETREGISTRY_PACKAGEBUILDDEPENDENCIES"] = 1013] = "ASSETREGISTRY_PACKAGEBUILDDEPENDENCIES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["METADATA_SERIALIZATION_OFFSET"] = 1014] = "METADATA_SERIALIZATION_OFFSET";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["VERSE_CELLS"] = 1015] = "VERSE_CELLS";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["PACKAGE_SAVED_HASH"] = 1016] = "PACKAGE_SAVED_HASH";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["OS_SUB_OBJECT_SHADOW_SERIALIZATION"] = 1017] = "OS_SUB_OBJECT_SHADOW_SERIALIZATION";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["IMPORT_TYPE_HIERARCHIES"] = 1018] = "IMPORT_TYPE_HIERARCHIES";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["AUTOMATIC_VERSION_PLUS_ONE"] = 1019] = "AUTOMATIC_VERSION_PLUS_ONE";
    EUnrealEngineObjectUE5Version[EUnrealEngineObjectUE5Version["AUTOMATIC_VERSION"] = 1018] = "AUTOMATIC_VERSION";
})(EUnrealEngineObjectUE5Version || (exports.EUnrealEngineObjectUE5Version = EUnrealEngineObjectUE5Version = {}));
;
//# sourceMappingURL=EUnrealEngineObjectUE5Version.js.map
},function(module,exports,__r){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveBodyChunks = exports.CompressionAlgorithmCode = void 0;
const pako_1 = __importDefault(__r(26));
const alignment_enum_1 = __r(21);
const parser_error_1 = __r(3);
var CompressionAlgorithmCode;
(function (CompressionAlgorithmCode) {
    CompressionAlgorithmCode[CompressionAlgorithmCode["ZLIB"] = 3] = "ZLIB";
})(CompressionAlgorithmCode || (exports.CompressionAlgorithmCode = CompressionAlgorithmCode = {}));
var SaveBodyChunks;
(function (SaveBodyChunks) {
    SaveBodyChunks.HEADER_V1 = 0x00000000;
    SaveBodyChunks.HEADER_V2 = 0x22222222;
    SaveBodyChunks.DecompressChunks = (fileBuffer, alignment = alignment_enum_1.Alignment.LITTLE_ENDIAN) => {
        var array = new DataView(fileBuffer);
        let currentByte = 0;
        let maxUncompressedChunkContentSize = 0;
        let packageFileTag = 0;
        let chunkHeaderSize = 0;
        let chunkHeaderVersion = SaveBodyChunks.HEADER_V2;
        let compressionAlgorithm = CompressionAlgorithmCode.ZLIB;
        let currentChunks = [];
        do {
            if (currentChunks.length === 0) {
                packageFileTag = array.getUint32(currentByte, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
                chunkHeaderVersion = array.getUint32(currentByte + 4, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
                chunkHeaderSize = chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 48 : 49;
                maxUncompressedChunkContentSize = array.getInt32(currentByte + 8, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
                if (chunkHeaderVersion === SaveBodyChunks.HEADER_V2) {
                    compressionAlgorithm = array.getUint8(currentByte + 16);
                }
            }
            const chunkUncompressedLength = array.getInt32(currentByte + (chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 24 : 25), alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            const chunkCompressedLength = array.getInt32(currentByte + (chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 32 : 33), alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            currentByte += chunkHeaderSize;
            try {
                let currentInflatedChunk = null;
                currentInflatedChunk = pako_1.default.inflate(new Uint8Array(fileBuffer.slice(currentByte, currentByte + chunkCompressedLength)));
                currentChunks.push(currentInflatedChunk);
                currentByte += chunkCompressedLength;
                fileBuffer = fileBuffer.slice(currentByte);
                array = new DataView(fileBuffer);
                currentByte = 0;
            }
            catch (err) {
                throw new parser_error_1.ParserError('ParserError', 'An error occurred while calling pako inflate.' + err);
            }
        } while (currentByte < fileBuffer.byteLength);
        let newChunkLength = currentChunks.map(cc => cc.length).reduce((prev, cur) => prev + cur);
        const bigWholeChunk = new Uint8Array(newChunkLength);
        let currentLength = 0;
        for (let i = 0; i < currentChunks.length; i++) {
            bigWholeChunk.set(currentChunks[i], currentLength);
            currentLength += currentChunks[i].length;
        }
        return {
            uncompressedData: bigWholeChunk,
            compressionInfo: {
                chunkHeaderVersion,
                packageFileTag,
                maxUncompressedChunkContentSize,
                compressionAlgorithm
            }
        };
    };
    SaveBodyChunks.CompressDataIntoChunks = (bufferArray, compressionInfo, blueprintOrSave, onBinaryBeforeCompressing, onChunk, alignment = alignment_enum_1.Alignment.LITTLE_ENDIAN) => {
        const totalUncompressedSize = bufferArray.byteLength;
        const chunkHeaderSize = compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 48 : 49;
        const saveBody = new Uint8Array(bufferArray.byteLength + 4);
        saveBody.set(new Uint8Array(bufferArray), 4);
        const miniView = new DataView(saveBody.buffer);
        miniView.setInt32(0, totalUncompressedSize - (blueprintOrSave === 'save' ? 4 : 0), alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        onBinaryBeforeCompressing(saveBody.buffer);
        let handledByte = 0;
        const chunkSummary = [];
        while (handledByte < saveBody.byteLength) {
            const uncompressedContentSize = Math.min(compressionInfo.maxUncompressedChunkContentSize, saveBody.byteLength - handledByte);
            const uncompressedChunk = saveBody.buffer.slice(handledByte, handledByte + uncompressedContentSize);
            let compressedChunk = new Uint8Array(0);
            try {
                compressedChunk = pako_1.default.deflate(uncompressedChunk);
            }
            catch (err) {
                throw new parser_error_1.CompressionLibraryError("Could not compress save data. " + err);
            }
            const chunk = new Uint8Array(chunkHeaderSize + compressedChunk.byteLength);
            chunk.set(compressedChunk, chunkHeaderSize);
            const view = new DataView(chunk.buffer);
            view.setInt32(0, compressionInfo.packageFileTag, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(4, compressionInfo.chunkHeaderVersion, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(8, compressionInfo.maxUncompressedChunkContentSize, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(12, 0, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            if (compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V2) {
                view.setUint8(16, CompressionAlgorithmCode.ZLIB);
            }
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 16 : 17, compressedChunk.byteLength, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 20 : 21, 0, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 24 : 25, uncompressedContentSize, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 28 : 29, 0, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 32 : 33, compressedChunk.byteLength, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 36 : 37, 0, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 40 : 41, uncompressedContentSize, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            view.setInt32(compressionInfo.chunkHeaderVersion === SaveBodyChunks.HEADER_V1 ? 44 : 45, 0, alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
            onChunk(chunk);
            chunkSummary.push({
                uncompressedSize: uncompressedContentSize + chunkHeaderSize,
                compressedSize: compressedChunk.byteLength + chunkHeaderSize
            });
            handledByte += uncompressedContentSize;
        }
        return chunkSummary;
    };
})(SaveBodyChunks || (exports.SaveBodyChunks = SaveBodyChunks = {}));
//# sourceMappingURL=save-body-chunks.js.map
},function(module,exports,__r){
// Top level file is just a mixin of submodules & constants
'use strict';

const { Deflate, deflate, deflateRaw, gzip } = __r(27);

const { Inflate, inflate, inflateRaw, ungzip } = __r(37);

const constants = __r(33);

module.exports.Deflate = Deflate;
module.exports.deflate = deflate;
module.exports.deflateRaw = deflateRaw;
module.exports.gzip = gzip;
module.exports.Inflate = Inflate;
module.exports.inflate = inflate;
module.exports.inflateRaw = inflateRaw;
module.exports.ungzip = ungzip;
module.exports.constants = constants;

},function(module,exports,__r){
'use strict';


const zlib_deflate = __r(28);
const utils        = __r(34);
const strings      = __r(35);
const msg          = __r(32);
const ZStream      = __r(36);

const toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH,
  Z_OK, Z_STREAM_END,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED
} = __r(33);

/* ===========================================================================*/

const defaultOptions = {
  level: Z_DEFAULT_COMPRESSION,
  method: Z_DEFLATED,
  chunkSize: 16384,
  windowBits: 15,
  memLevel: 8,
  strategy: Z_DEFAULT_STRATEGY,
  legacyHash: true
};

/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * - `legacyHash` (Boolean) - use the classic zlib hash (default), which matches
 *   canonical zlib output byte-for-byte. Set to `false` to use the faster
 *   ANZAC++ hash, which matches recent (chromium) node.js output instead.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = __r(26)
 *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * const deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  this.options = utils.assign({}, defaultOptions, options || {});

  let opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  let status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy,
    opt.legacyHash
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    let dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, flush_mode]) -> Boolean
 * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must
 * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
 * buffers and call [[Deflate#onEnd]].
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;

  if (this.ended) { return false; }

  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  for (;;) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    // Make sure avail_out > 6 to avoid repeating markers
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }

    status = zlib_deflate.deflate(strm, _flush_mode);

    // Ended => flush and finish
    if (status === Z_STREAM_END) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = zlib_deflate.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK;
    }

    // Flush if out buffer full
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }

    // Flush if requested and has data
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }

    if (strm.avail_in === 0) break;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array): output data.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH). By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    this.result = utils.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array
 * - data (Uint8Array|ArrayBuffer|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = __r(26)
 * const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  const deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array
 * - data (Uint8Array|ArrayBuffer|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array
 * - data (Uint8Array|ArrayBuffer|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


module.exports.Deflate = Deflate;
module.exports.deflate = deflate;
module.exports.deflateRaw = deflateRaw;
module.exports.gzip = gzip;
module.exports.constants = __r(33);

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = __r(29);
const adler32 = __r(30);
const crc32   = __r(31);
const msg     = __r(32);

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK,
  Z_OK, Z_STREAM_END, Z_STREAM_ERROR, Z_DATA_ERROR, Z_BUF_ERROR,
  Z_DEFAULT_COMPRESSION,
  Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY,
  Z_UNKNOWN,
  Z_DEFLATED
} = __r(33);

/*============================================================================*/


const MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
const MAX_WBITS = 15;
/* 32K LZ77 window */
const DEF_MEM_LEVEL = 8;


const LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
const LITERALS      = 256;
/* number of literal bytes 0..255 */
const L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
const D_CODES       = 30;
/* number of distance codes */
const BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
const HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
const MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

const MIN_MATCH = 3;
const MAX_MATCH = 258;
const MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

const PRESET_DICT = 0x20;

const INIT_STATE    =  42;    /* zlib header -> BUSY_STATE */
//#ifdef GZIP
const GZIP_STATE    =  57;    /* gzip header -> BUSY_STATE | EXTRA_STATE */
//#endif
const EXTRA_STATE   =  69;    /* gzip extra block -> NAME_STATE */
const NAME_STATE    =  73;    /* gzip file name -> COMMENT_STATE */
const COMMENT_STATE =  91;    /* gzip comment -> HCRC_STATE */
const HCRC_STATE    = 103;    /* gzip header CRC -> BUSY_STATE */
const BUSY_STATE    = 113;    /* deflate -> FINISH_STATE */
const FINISH_STATE  = 666;    /* stream complete */

const BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
const BS_BLOCK_DONE     = 2; /* block flush performed */
const BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
const BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

const OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

const err = (strm, errorCode) => {
  strm.msg = msg[errorCode];
  return errorCode;
};

const rank = (f) => {
  return ((f) * 2) - ((f) > 4 ? 9 : 0);
};

const zero = (buf) => {
  let len = buf.length; while (--len >= 0) { buf[len] = 0; }
};

/* ===========================================================================
 * Slide the hash table when sliding the window down (could be avoided with 32
 * bit values at the expense of memory usage). We slide even when level == 0 to
 * keep the hash table consistent if we switch back to level > 0 later.
 */
const slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;

  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = (m >= wsize ? m - wsize : 0);
  } while (--n);
  n = wsize;
//#ifndef FASTEST
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = (m >= wsize ? m - wsize : 0);
    /* If n is not on any hash chain, prev[n] is garbage but
     * its value will never be used.
     */
  } while (--n);
//#endif
};

/* eslint-disable new-cap */
let HASH = (s, prev, data) => ((prev << s.hash_shift) ^ data) & s.hash_mask;


/* ===========================================================================
 * Insert string str in the dictionary and set match_head to the previous head
 * of the hash chain (the most recent string with same hash key). Return
 * the previous length of the hash chain.
 * IN  assertion: all calls to INSERT_STRING are made with consecutive input
 *    characters and the first MIN_MATCH bytes of str are valid (except for
 *    the last MIN_MATCH-1 bytes of the input file).
 */
const INSERT_STRING = (s, str) => {
  let h;
  if (s.legacy_hash) {
    /* UPDATE_HASH(s, s->ins_h, s->window[(str) + (MIN_MATCH-1)]); */
    h = s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
  } else {
    // ANZAC++ hash: reads 4 bytes, matches node.js zlib output (legacyHash
    // restores classic zlib hash). Faster, with fewer collisions.
    const w = s.window;
    // Read 4 bytes little-endian. Math.imul reproduces C uint32 overflow in
    // `(value * 66521 + 66521) >> 16` exactly.
    const value = w[str] | (w[str + 1] << 8) | (w[str + 2] << 16) | (w[str + 3] << 24);
    h = s.ins_h = ((Math.imul(value, 66521) + 66521) >>> 16) & s.hash_mask;
  }
  const hash_head = s.prev[str & s.w_mask] = s.head[h];
  s.head[h] = str;
  return hash_head;
};


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output, except for
 * some deflate_stored() output, goes through this function so some
 * applications may wish to modify it to avoid allocating a large
 * strm->next_out buffer and copying into it. (See also read_buf()).
 */
const flush_pending = (strm) => {
  const s = strm.state;

  //_tr_flush_bits(s);
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out  += len;
  s.pending_out  += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending      -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};


const flush_block_only = (s, last) => {
  _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};


const put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
const putShortMSB = (s, b) => {

  //  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
};


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
const read_buf = (strm, buf, start, size) => {

  let len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
};


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
const longest_match = (s, cur_match) => {

  let chain_length = s.max_chain_length;      /* max hash chain length */
  let scan = s.strstart; /* current string */
  let match;                       /* matched string */
  let len;                           /* length of current match */
  let best_len = s.prev_length;              /* best match length so far */
  let nice_match = s.nice_match;             /* stop if match long enough */
  const limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  const _win = s.window; // shortcut

  const wmask = s.w_mask;
  const prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  const strend = s.strstart + MAX_MATCH;
  let scan_end1  = _win[scan + best_len - 1];
  let scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
const fill_window = (s) => {

  const _w_size = s.w_size;
  let n, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (!s.legacy_hash) {
      /* The 4-byte hash reads one extra byte, so it needs one more available. */
      if (s.lookahead + s.insert > MIN_MATCH) {
        str = s.strstart - s.insert;
        while (s.insert) {
          INSERT_STRING(s, str);
          str++;
          s.insert--;
          if (s.lookahead + s.insert <= MIN_MATCH) {
            break;
          }
        }
      }
    } else if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        INSERT_STRING(s, str);
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    const curr = s.strstart + s.lookahead;
//    let init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
};

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 *
 * In case deflateParams() is used to later switch to a non-zero compression
 * level, s->matches (otherwise unused when storing) keeps track of the number
 * of hash table slides to perform. If s->matches is 1, then one hash table
 * slide will be done when switching. If s->matches is 2, the maximum value
 * allowed here, then the hash table will be cleared, since two or more slides
 * is the same as a clear.
 *
 * deflate_stored() is written to minimize the number of times an input byte is
 * copied. It is most efficient with large input and output buffers, which
 * maximizes the opportunites to have a single copy from next_in to next_out.
 */
const deflate_stored = (s, flush) => {

  /* Smallest worthy block size when not flushing or finishing. By default
   * this is 32K. This can be as small as 507 bytes for memLevel == 1. For
   * large input and output buffers, the stored block size will be larger.
   */
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;

  /* Copy as many min_block or larger stored blocks directly to next_out as
   * possible. If flushing, copy the remaining available input to next_out as
   * stored blocks, if there is enough space.
   */
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    /* Set len to the maximum size block that we can copy directly with the
     * available input data and output space. Set left to how much of that
     * would be copied from what's left in the window.
     */
    len = 65535/* MAX_STORED */;     /* maximum deflate stored block length */
    have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
    if (s.strm.avail_out < have) {         /* need room for header */
      break;
    }
      /* maximum stored block length that will fit in avail_out: */
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;  /* bytes left in window */
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;   /* limit len to the input */
    }
    if (len > have) {
      len = have;             /* limit len to the output */
    }

    /* If the stored block would be less than min_block in length, or if
     * unable to copy all of the available input when flushing, then try
     * copying to the window and the pending buffer instead. Also don't
     * write an empty block when flushing -- deflate() does that.
     */
    if (len < min_block && ((len === 0 && flush !== Z_FINISH) ||
                        flush === Z_NO_FLUSH ||
                        len !== left + s.strm.avail_in)) {
      break;
    }

    /* Make a dummy stored block in pending to get the header bytes,
     * including any pending bits. This also updates the debugging counts.
     */
    last = flush === Z_FINISH && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);

    /* Replace the lengths in the dummy stored block with len. */
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;

    /* Write the stored block header bytes. */
    flush_pending(s.strm);

//#ifdef ZLIB_DEBUG
//    /* Update debugging counts for the data about to be copied. */
//    s->compressed_len += len << 3;
//    s->bits_sent += len << 3;
//#endif

    /* Copy uncompressed bytes from the window to next_out. */
    if (left) {
      if (left > len) {
        left = len;
      }
      //zmemcpy(s->strm->next_out, s->window + s->block_start, left);
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }

    /* Copy uncompressed bytes directly from next_in to next_out, updating
     * the check value.
     */
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);

  /* Update the sliding window with the last s->w_size bytes of the copied
   * data, or append all of the copied data to the existing window if less
   * than s->w_size bytes were copied. Also update the number of bytes to
   * insert in the hash tables, in the event that deflateParams() switches to
   * a non-zero compression level.
   */
  used -= s.strm.avail_in;    /* number of input bytes directly copied */
  if (used) {
    /* If any input was used, then no unused input remains in the window,
     * therefore s->block_start == s->strstart.
     */
    if (used >= s.w_size) {  /* supplant the previous history */
      s.matches = 2;     /* clear hash */
      //zmemcpy(s->window, s->strm->next_in - s->w_size, s->w_size);
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    }
    else {
      if (s.window_size - s.strstart <= used) {
        /* Slide the window down. */
        s.strstart -= s.w_size;
        //zmemcpy(s->window, s->window + s->w_size, s->strstart);
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;   /* add a pending slide_hash() */
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      //zmemcpy(s->window + s->strstart, s->strm->next_in - used, used);
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }

  /* If the last block was written to next_out, then done. */
  if (last) {
    return BS_FINISH_DONE;
  }

  /* If flushing and all input has been consumed, then done. */
  if (flush !== Z_NO_FLUSH && flush !== Z_FINISH &&
    s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }

  /* Fill the window with any remaining input. */
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    /* Slide the window down. */
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    //zmemcpy(s->window, s->window + s->w_size, s->strstart);
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;       /* add a pending slide_hash() */
    }
    have += s.w_size;      /* more space now */
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }

  /* There was not enough avail_out to write a complete worthy or flushed
   * stored block to next_out. Write a stored block to pending instead, if we
   * have enough input for a worthy block, or if flushing and there is enough
   * room for the remaining input as a stored block in the pending buffer.
   */
  have = (s.bi_valid + 42) >> 3;     /* number of header bytes */
    /* maximum stored block length that will fit in pending: */
  have = s.pending_buf_size - have > 65535/* MAX_STORED */ ? 65535/* MAX_STORED */ : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block ||
     ((left || flush === Z_FINISH) && flush !== Z_NO_FLUSH &&
     s.strm.avail_in === 0 && left <= have)) {
    len = left > have ? have : left;
    last = flush === Z_FINISH && s.strm.avail_in === 0 &&
         len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }

  /* We've done all we can with the available input and output. */
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};


/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
const deflate_fast = (s, flush) => {

  let hash_head;        /* head of the hash chain */
  let bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      hash_head = INSERT_STRING(s, s.strstart);
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          hash_head = INSERT_STRING(s, s.strstart);
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        if (s.legacy_hash) {
          s.ins_h = s.window[s.strstart];
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
           * matter since it will be recomputed at next deflate call.
           */
        }
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
const deflate_slow = (s, flush) => {

  let hash_head;          /* head of hash chain */
  let bflush;              /* set if current block must be flushed */

  let max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      hash_head = INSERT_STRING(s, s.strstart);
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          hash_head = INSERT_STRING(s, s.strstart);
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
};


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
const deflate_rle = (s, flush) => {

  let bflush;            /* set if current block must be flushed */
  let prev;              /* byte at distance one to match */
  let scan, strend;      /* scan goes up to strend for length of run */

  const _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
const deflate_huff = (s, flush) => {

  let bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
};

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {

  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

const configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
const lm_init = (s) => {

  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.legacy_hash = 0; /* use classic zlib hash instead of default ANZAC++ */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree  = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree    = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new Uint16Array(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new Uint16Array(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.sym_buf = 0;        /* buffer for distances and literals/lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.sym_next = 0;      /* running index in sym_buf */
  this.sym_end = 0;       /* symbol table full when sym_next reaches this */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


/* =========================================================================
 * Check for a valid deflate stream state. Return 0 if ok, 1 if not.
 */
const deflateStateCheck = (strm) => {

  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || (s.status !== INIT_STATE &&
//#ifdef GZIP
                                s.status !== GZIP_STATE &&
//#endif
                                s.status !== EXTRA_STATE &&
                                s.status !== NAME_STATE &&
                                s.status !== COMMENT_STATE &&
                                s.status !== HCRC_STATE &&
                                s.status !== BUSY_STATE &&
                                s.status !== FINISH_STATE)) {
    return 1;
  }
  return 0;
};


const deflateResetKeep = (strm) => {

  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status =
//#ifdef GZIP
    s.wrap === 2 ? GZIP_STATE :
//#endif
    s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK;
};


const deflateReset = (strm) => {

  const ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
};


const deflateSetHeader = (strm, head) => {

  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR;
  }
  strm.state.gzhead = head;
  return Z_OK;
};


const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy, legacyHash) => {

  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  let wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED || (windowBits === 8 && wrap !== 1)) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  const s = new DeflateState();

  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;     /* to pass state test in deflateReset() */

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.legacy_hash = legacyHash ? 1 : 0;

  s.hash_bits = memLevel + 7;
  /* ANZAC++ hash needs >= 15 hash bits to span its 4 read bytes. */
  if (!s.legacy_hash && s.hash_bits < 15) {
    s.hash_bits = 15;
  }
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  /* We overlay pending_buf and sym_buf. This works since the average size
   * for length/distance pairs over any compressed block is assured to be 31
   * bits or less.
   *
   * Analysis: The longest fixed codes are a length code of 8 bits plus 5
   * extra bits, for lengths 131 to 257. The longest fixed distance codes are
   * 5 bits plus 13 extra bits, for distances 16385 to 32768. The longest
   * possible fixed-codes length/distance pair is then 31 bits total.
   *
   * sym_buf starts one-fourth of the way into pending_buf. So there are
   * three bytes in sym_buf for every four bytes in pending_buf. Each symbol
   * in sym_buf is three bytes -- two for the distance and one for the
   * literal/length. As each symbol is consumed, the pointer to the next
   * sym_buf value to read moves forward three bytes. From that symbol, up to
   * 31 bits are written to pending_buf. The closest the written pending_buf
   * bits gets to the next sym_buf symbol to read is just before the last
   * code is written. At that time, 31*(n-2) bits have been written, just
   * after 24*(n-2) bits have been consumed from sym_buf. sym_buf starts at
   * 8*n bits into pending_buf. (Note that the symbol buffer fills when n-1
   * symbols are written.) The closest the writing gets to what is unread is
   * then n+14 bits. Here n is lit_bufsize, which is 16384 by default, and
   * can range from 128 to 32768.
   *
   * Therefore, at a minimum, there are 142 bits of space between what is
   * written and what is read in the overlain buffers, so the symbols cannot
   * be overwritten by the compressed data. That space is actually 139 bits,
   * due to the three-bit fixed-code block header.
   *
   * That covers the case where either Z_FIXED is specified, forcing fixed
   * codes, or when the use of fixed codes is chosen, because that choice
   * results in a smaller compressed block than dynamic codes. That latter
   * condition then assures that the above analysis also covers all dynamic
   * blocks. A dynamic-code block will only be chosen to be emitted if it has
   * fewer bits than a fixed-code block would for the same set of symbols.
   * Therefore its average symbol length is assured to be less than 31. So
   * the compressed data for a dynamic block also cannot overwrite the
   * symbols from which it is being constructed.
   */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->sym_buf = s->pending_buf + s->lit_bufsize;
  s.sym_buf = s.lit_bufsize;

  //s->sym_end = (s->lit_bufsize - 1) * 3;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  /* We avoid equality with lit_bufsize*3 because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
};

const deflateInit = (strm, level) => {

  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
};


/* ========================================================================= */
const deflate = (strm, flush) => {

  if (deflateStateCheck(strm) || flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  const s = strm.state;

  if (!strm.output ||
      (strm.avail_in !== 0 && !strm.input) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  const old_flush = s.last_flush;
  s.last_flush = flush;

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Write the header */
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    /* zlib header */
    let header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
    let level_flags = -1;

    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= (level_flags << 6);
    if (s.strstart !== 0) { header |= PRESET_DICT; }
    header += 31 - (header % 31);

    putShortMSB(s, header);

    /* Save the adler32 of the preset dictionary: */
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }
    strm.adler = 1; // adler32(0L, Z_NULL, 0);
    s.status = BUSY_STATE;

    /* Compression must start with an empty pending buffer */
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK;
    }
  }
//#ifdef GZIP
  if (s.status === GZIP_STATE) {
    /* gzip header */
    strm.adler = 0;  //crc32(0L, Z_NULL, 0);
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) { // s->gzhead == Z_NULL
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 :
                  (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                   4 : 0));
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;

      /* Compression must start with an empty pending buffer */
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK;
      }
    }
    else {
      put_byte(s, (s.gzhead.text ? 1 : 0) +
                  (s.gzhead.hcrc ? 2 : 0) +
                  (!s.gzhead.extra ? 0 : 4) +
                  (!s.gzhead.name ? 0 : 8) +
                  (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 0xff);
      put_byte(s, (s.gzhead.time >> 8) & 0xff);
      put_byte(s, (s.gzhead.time >> 16) & 0xff);
      put_byte(s, (s.gzhead.time >> 24) & 0xff);
      put_byte(s, s.level === 9 ? 2 :
                  (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                   4 : 0));
      put_byte(s, s.gzhead.os & 0xff);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 0xff);
        put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let left = (s.gzhead.extra.length & 0xffff) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        // zmemcpy(s.pending_buf + s.pending,
        //    s.gzhead.extra + s.gzindex, copy);
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        //--- HCRC_UPDATE(beg) ---//
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        //---//
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK;
        }
        beg = 0;
        left -= copy;
      }
      // JS specific: s.gzhead.extra may be TypedArray or Array for backward compatibility
      //              TypedArray.slice and TypedArray.from don't exist in IE10-IE11
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      // zmemcpy(s->pending_buf + s->pending,
      //     s->gzhead->extra + s->gzindex, left);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK;
          }
          beg = 0;
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      let beg = s.pending;   /* start of bytes to update crc */
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          //--- HCRC_UPDATE(beg) ---//
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          //---//
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK;
          }
          beg = 0;
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      //--- HCRC_UPDATE(beg) ---//
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      //---//
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      }
      put_byte(s, strm.adler & 0xff);
      put_byte(s, (strm.adler >> 8) & 0xff);
      strm.adler = 0; //crc32(0L, Z_NULL, 0);
    }
    s.status = BUSY_STATE;

    /* Compression must start with an empty pending buffer */
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK;
    }
  }
//#endif

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) :
                 s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) :
                 s.strategy === Z_RLE ? deflate_rle(s, flush) :
                 configuration_table[s.level].func(s, flush);

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        _tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
};


const deflateEnd = (strm) => {

  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR;
  }

  const status = strm.state.status;

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
};


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
const deflateSetDictionary = (strm, dictionary) => {

  let dictLength = dictionary.length;

  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR;
  }

  const s = strm.state;
  const wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      INSERT_STRING(s, str);
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
};


module.exports.deflateInit = deflateInit;
module.exports.deflateInit2 = deflateInit2;
module.exports.deflateReset = deflateReset;
module.exports.deflateResetKeep = deflateResetKeep;
module.exports.deflateSetHeader = deflateSetHeader;
module.exports.deflate = deflate;
module.exports.deflateEnd = deflateEnd;
module.exports.deflateSetDictionary = deflateSetDictionary;
module.exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
module.exports.deflateBound = deflateBound;
module.exports.deflateCopy = deflateCopy;
module.exports.deflateGetDictionary = deflateGetDictionary;
module.exports.deflateParams = deflateParams;
module.exports.deflatePending = deflatePending;
module.exports.deflatePrime = deflatePrime;
module.exports.deflateTune = deflateTune;
*/

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

/* Public constants ==========================================================*/
/* ===========================================================================*/


//const Z_FILTERED          = 1;
//const Z_HUFFMAN_ONLY      = 2;
//const Z_RLE               = 3;
const Z_FIXED               = 4;
//const Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
const Z_BINARY              = 0;
const Z_TEXT                = 1;
//const Z_ASCII             = 1; // = Z_TEXT
const Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { let len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

const STORED_BLOCK = 0;
const STATIC_TREES = 1;
const DYN_TREES    = 2;
/* The three kinds of block type */

const MIN_MATCH    = 3;
const MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

const LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

const LITERALS      = 256;
/* number of literal bytes 0..255 */

const L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

const D_CODES       = 30;
/* number of distance codes */

const BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

const HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

const MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

const Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

const MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

const END_BLOCK   = 256;
/* end of block literal code */

const REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

const REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

const REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
const extra_lbits =   /* extra bits for each length code */
  new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]);

const extra_dbits =   /* extra bits for each distance code */
  new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]);

const extra_blbits =  /* extra bits for each bit length code */
  new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]);

const bl_order =
  new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

const DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
const static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

const static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

const _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

const _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

const base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

const base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


let static_l_desc;
let static_d_desc;
let static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



const d_code = (dist) => {

  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
const put_short = (s, w) => {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
};


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
const send_bits = (s, value, length) => {

  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
};


const send_code = (s, c, tree) => {

  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
};


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
const bi_reverse = (code, len) => {

  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
const bi_flush = (s) => {

  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
const gen_bitlen = (s, desc) => {
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */

  const tree            = desc.dyn_tree;
  const max_code        = desc.max_code;
  const stree           = desc.stat_desc.static_tree;
  const has_stree       = desc.stat_desc.has_stree;
  const extra           = desc.stat_desc.extra_bits;
  const base            = desc.stat_desc.extra_base;
  const max_length      = desc.stat_desc.max_length;
  let h;              /* heap index */
  let n, m;           /* iterate over the tree elements */
  let bits;           /* bit length */
  let xbits;          /* extra bits */
  let f;              /* frequency */
  let overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Tracev((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Tracev((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
};


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
const gen_codes = (tree, max_code, bl_count) => {
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */

  const next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  let code = 0;              /* running code value */
  let bits;                  /* bit index */
  let n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    code = (code + bl_count[bits - 1]) << 1;
    next_code[bits] = code;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    let len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
};


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
const tr_static_init = () => {

  let n;        /* iterates over tree elements */
  let bits;     /* bit counter */
  let length;   /* length value */
  let code;     /* code value */
  let dist;     /* distance index */
  const bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
};


/* ===========================================================================
 * Initialize a new block.
 */
const init_block = (s) => {

  let n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
const bi_windup = (s) =>
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
const smaller = (tree, n, m, depth) => {

  const _n2 = n * 2;
  const _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
};

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
const pqdownheap = (s, tree, k) => {
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */

  const v = s.heap[k];
  let j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
};


// inlined manually
// const SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
const compress_block = (s, ltree, dtree) => {
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */

  let dist;           /* distance of matched string */
  let lc;             /* match length or unmatched char (if dist == 0) */
  let sx = 0;         /* running index in sym_buf */
  let code;           /* the code to send */
  let extra;          /* number of extra bits to send */

  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 0xff;
      dist += (s.pending_buf[s.sym_buf + sx++] & 0xff) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and sym_buf is ok: */
      //Assert(s->pending < s->lit_bufsize + sx, "pendingBuf overflow");

    } while (sx < s.sym_next);
  }

  send_code(s, END_BLOCK, ltree);
};


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
const build_tree = (s, desc) => {
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */

  const tree     = desc.dyn_tree;
  const stree    = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems    = desc.stat_desc.elems;
  let n, m;          /* iterate over heap elements */
  let max_code = -1; /* largest code with non zero frequency */
  let node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
};


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
const scan_tree = (s, tree, max_code) => {
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */

  let n;                     /* iterates over all tree elements */
  let prevlen = -1;          /* last emitted length */
  let curlen;                /* length of current code */

  let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  let count = 0;             /* repeat count of the current code */
  let max_count = 7;         /* max repeat count */
  let min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
const send_tree = (s, tree, max_code) => {
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */

  let n;                     /* iterates over all tree elements */
  let prevlen = -1;          /* last emitted length */
  let curlen;                /* length of current code */

  let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  let count = 0;             /* repeat count of the current code */
  let max_count = 7;         /* max repeat count */
  let min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
const build_bl_tree = (s) => {

  let max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
};


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
const send_all_trees = (s, lcodes, dcodes, blcodes) => {
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */

  let rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
};


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "block list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "allow list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
const detect_data_type = (s) => {
  /* block_mask is the bit mask of block-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  let block_mask = 0xf3ffc07f;
  let n;

  /* Check for non-textual ("block-listed") bytes. */
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if ((block_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("allow-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "block-listed" or "allow-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
};


let static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
const _tr_init = (s) =>
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
};


/* ===========================================================================
 * Send a stored block
 */
const _tr_stored_block = (s, buf, stored_len, last) => {
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */

  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  bi_windup(s);        /* align on byte boundary */
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
const _tr_align = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and write out the encoded block.
 */
const _tr_flush_block = (s, buf, stored_len, last) => {
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */

  let opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  let max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->sym_next / 3));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
};

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
const _tr_tally = (s, dist, lc) => {
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */

  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

  return (s.sym_next === s.sym_end);
};

module.exports._tr_init  = _tr_init;
module.exports._tr_stored_block = _tr_stored_block;
module.exports._tr_flush_block  = _tr_flush_block;
module.exports._tr_tally = _tr_tally;
module.exports._tr_align = _tr_align;

},function(module,exports,__r){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const adler32 = (adler, buf, len, pos) => {
  let s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
};


module.exports = adler32;

},function(module,exports,__r){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
const makeTable = () => {
  let c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
};

// Create table on load. Just 255 signed longs. Not a problem.
const crcTable = new Uint32Array(makeTable());


const crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;

  crc ^= -1;

  for (let i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
};


module.exports = crc32;

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  Z_MEM_ERROR:       -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},function(module,exports,__r){
'use strict';


const _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

module.exports.assign = function (obj /*from1, from2, from3, ...*/) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// Join array of chunks to single array.
module.exports.flattenChunks = (chunks) => {
  // calculate data length
  let len = 0;

  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }

  // join chunks
  const result = new Uint8Array(len);

  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }

  return result;
};

},function(module,exports,__r){
// String encode/decode helpers
'use strict';


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
let STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
const _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[255] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
module.exports.string2buf = (str) => {
  if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }

  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new Uint8Array(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper
const buf2binstring = (buf, len) => {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }

  let result = '';
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};


// convert array to string
module.exports.buf2string = (buf, max) => {
  const len = max || buf.length;

  if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }

  let i, out;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  const utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    let c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    let c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
module.exports.utf8border = (buf, max) => {

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},function(module,exports,__r){
'use strict';


const zlib_inflate = __r(38);
const utils        = __r(34);
const strings      = __r(35);
const msg          = __r(32);
const ZStream      = __r(36);
const GZheader     = __r(41);

const toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_NO_FLUSH, Z_FINISH,
  Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Z_BUF_ERROR
} = __r(33);

/* ===========================================================================*/

const defaultOptions = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ''
};

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = __r(26)
 * const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
 * const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * const inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  this.options = utils.assign({}, defaultOptions, options || {});

  const opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  let status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, flush_mode]) -> Boolean
 * - data (Uint8Array|ArrayBuffer): input data
 * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
 *   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
 *   `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. If end of stream detected,
 * [[Inflate#onEnd]] will be called.
 *
 * `flush_mode` is not needed for normal operation, because end of stream
 * detected automatically. You may try to use it for advanced things, but
 * this functionality was not tested.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;

  if (this.ended) return false;

  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;

  // Convert data if needed
  if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  for (;;) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, _flush_mode);

    if (status === Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(strm, dictionary);

      if (status === Z_OK) {
        status = zlib_inflate.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        // Replace code with more verbose
        status = Z_NEED_DICT;
      }
    }

    // Only the gzip format defines concatenated members (RFC 1952: a gzip file
    // is "a series of members"). A zlib stream (RFC 1950) ends after its
    // ADLER32, and a raw DEFLATE stream (RFC 1951) ends after its final block -
    // neither format allows anything to follow, so bytes after the end are not
    // ours to interpret and must be left in the input. Restart decoding only
    // for a gzip member: `state.flags` is non-zero only once a gzip header has
    // actually been decoded (it stays 0 for a zlib member, even when the format
    // was auto-detected and the gzip bit of `wrap` is set). A trailing zero
    // byte is padding, not the start of a member (no member can begin with 0).
    while (strm.avail_in > 0 &&
           status === Z_STREAM_END &&
           (strm.state.wrap & 2) && strm.state.flags !== 0 &&
           strm.input[strm.next_in] !== 0)
    {
      zlib_inflate.inflateReset(strm);
      status = zlib_inflate.inflate(strm, _flush_mode);
    }

    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }

    // Remember real `avail_out` value, because we may patch out buffer content
    // to align utf8 strings boundaries.
    last_avail_out = strm.avail_out;

    if (strm.next_out) {
      // Flush output if buffer is full, stream ended, or an explicit flush was
      // requested (e.g. Z_SYNC_FLUSH) - to push out the tail, same as node's zlib.
      if (strm.avail_out === 0 || status === Z_STREAM_END || _flush_mode > 0) {

        if (this.options.to === 'string') {

          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail & realign counters
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);

          this.onData(utf8str);

        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));

          // Force a fresh output buffer on next iteration / next push, so the
          // already emitted tail is not sent again.
          strm.avail_out = 0;
          strm.next_out = 0;
        }
      }
    }

    // A full output buffer means there may be more to produce - allocate a new
    // one and call inflate again. The status depends on the flush mode: with
    // Z_NO_FLUSH a full buffer is reported as Z_OK, but with Z_FINISH the same
    // situation is reported as Z_BUF_ERROR ("could not make progress now",
    // non-fatal) even though output is still pending. Both must continue; the
    // distinction that matters is purely "was the output buffer exhausted".
    if ((status === Z_OK || status === Z_BUF_ERROR) && last_avail_out === 0) continue;

    // Finalize if end of stream reached.
    if (status === Z_STREAM_END) {
      status = zlib_inflate.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }

    if (strm.avail_in === 0) {
      // Input is exhausted. If the caller declared this the end of the stream
      // (Z_FINISH) but we never saw Z_STREAM_END, the compressed data ended
      // before its terminating marker - i.e. it is truncated/incomplete. That
      // is an error: returning the partial output as success would be
      // indistinguishable from a complete decode, hiding the data loss. Report
      // it via Z_BUF_ERROR. (Reached only when the output buffer still had room
      // - a full buffer is handled by the `continue` above - so this genuinely
      // means "ran out of input", not "ran out of output".)
      if (_flush_mode === Z_FINISH) {
        status = zlib_inflate.inflateEnd(this.strm);
        this.onEnd(status === Z_OK ? Z_BUF_ERROR : status);
        this.ended = true;
        return false;
      }
      break;
    }
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|String): output data. When string output requested,
 *   each chunk will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH). By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|String
 * - data (Uint8Array|ArrayBuffer): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * const pako = __r(26);
 * const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
 * let output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err) {
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  const inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) throw inflator.msg || msg[inflator.err];

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|String
 * - data (Uint8Array|ArrayBuffer): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|String
 * - data (Uint8Array|ArrayBuffer): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


module.exports.Inflate = Inflate;
module.exports.inflate = inflate;
module.exports.inflateRaw = inflateRaw;
module.exports.ungzip = inflate;
module.exports.constants = __r(33);

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const adler32       = __r(30);
const crc32         = __r(31);
const inflate_fast  = __r(39);
const inflate_table = __r(40);

const CODES = 0;
const LENS = 1;
const DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/

const {
  Z_FINISH, Z_BLOCK, Z_TREES,
  Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Z_BUF_ERROR,
  Z_DEFLATED
} = __r(33);


/* STATES ====================================================================*/
/* ===========================================================================*/


const    HEAD = 16180;       /* i: waiting for magic header */
const    FLAGS = 16181;      /* i: waiting for method and flags (gzip) */
const    TIME = 16182;       /* i: waiting for modification time (gzip) */
const    OS = 16183;         /* i: waiting for extra flags and operating system (gzip) */
const    EXLEN = 16184;      /* i: waiting for extra length (gzip) */
const    EXTRA = 16185;      /* i: waiting for extra bytes (gzip) */
const    NAME = 16186;       /* i: waiting for end of file name (gzip) */
const    COMMENT = 16187;    /* i: waiting for end of comment (gzip) */
const    HCRC = 16188;       /* i: waiting for header crc (gzip) */
const    DICTID = 16189;    /* i: waiting for dictionary check value */
const    DICT = 16190;      /* waiting for inflateSetDictionary() call */
const        TYPE = 16191;      /* i: waiting for type bits, including last-flag bit */
const        TYPEDO = 16192;    /* i: same, but skip check to exit inflate on new block */
const        STORED = 16193;    /* i: waiting for stored size (length and complement) */
const        COPY_ = 16194;     /* i/o: same as COPY below, but only first time in */
const        COPY = 16195;      /* i/o: waiting for input or output to copy stored block */
const        TABLE = 16196;     /* i: waiting for dynamic block table lengths */
const        LENLENS = 16197;   /* i: waiting for code length code lengths */
const        CODELENS = 16198;  /* i: waiting for length/lit and distance code lengths */
const            LEN_ = 16199;      /* i: same as LEN below, but only first time in */
const            LEN = 16200;       /* i: waiting for length/lit/eob code */
const            LENEXT = 16201;    /* i: waiting for length extra bits */
const            DIST = 16202;      /* i: waiting for distance code */
const            DISTEXT = 16203;   /* i: waiting for distance extra bits */
const            MATCH = 16204;     /* o: waiting for output space to copy string */
const            LIT = 16205;       /* o: waiting for output space to write literal */
const    CHECK = 16206;     /* i: waiting for 32-bit check value */
const    LENGTH = 16207;    /* i: waiting for 32-bit length (gzip) */
const    DONE = 16208;      /* finished check, done -- remain here until reset */
const    BAD = 16209;       /* got a data error -- remain here until reset */
const    MEM = 16210;       /* got an inflate() memory error -- remain here until reset */
const    SYNC = 16211;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



const ENOUGH_LENS = 852;
const ENOUGH_DISTS = 592;
//const ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

const MAX_WBITS = 15;
/* 32K LZ77 window */
const DEF_WBITS = MAX_WBITS;


const zswap32 = (q) => {

  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
};


function InflateState() {
  this.strm = null;           /* pointer back to this zlib stream */
  this.mode = 0;              /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip,
                                 bit 2 true to validate check value */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib), or
                                 -1 if raw or no header yet */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new Uint16Array(320); /* temporary storage for code lengths */
  this.work = new Uint16Array(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new Int32Array(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}


const inflateStateCheck = (strm) => {

  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm ||
    state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};


const inflateResetKeep = (strm) => {

  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR; }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
};


const inflateReset = (strm) => {

  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR; }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

};


const inflateReset2 = (strm, windowBits) => {
  let wrap;

  /* get the state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR; }
  const state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};


const inflateInit2 = (strm, windowBits) => {

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  const state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.strm = strm;
  state.window = null/*Z_NULL*/;
  state.mode = HEAD;     /* to pass state test in inflateReset2() */
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
};


const inflateInit = (strm) => {

  return inflateInit2(strm, DEF_WBITS);
};


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
let virgin = true;

let lenfix, distfix; // We have no pointers in JS, so keep tables separate


const fixedtables = (state) => {

  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);

    /* literal/length table */
    let sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
const updatewindow = (strm, src, end, copy) => {

  let dist;
  const state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.window = new Uint8Array(1 << state.wbits);
  }

  /* if window not in use yet, initialize */
  if (state.wsize === 0) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
};


const inflate = (strm, flush) => {

  let state;
  let input, output;          // input/output buffers
  let next;                   /* next input INDEX */
  let put;                    /* next output INDEX */
  let have, left;             /* available input and output */
  let hold;                   /* bit buffer */
  let bits;                   /* bits in bit buffer */
  let _in, _out;              /* save starting available input and output */
  let copy;                   /* number of stored or match bytes to copy */
  let from;                   /* where to copy match bytes from */
  let from_source;
  let here = 0;               /* current decoding table entry */
  let here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //let last;                   /* parent table entry */
  let last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  let len;                    /* length to copy for repeats, bits to drop */
  let ret;                    /* return code */
  const hbuf = new Uint8Array(4);    /* buffer for gzip header crc calculation */
  let opts;

  let n; // temporary variable for NEED_BITS

  const order = /* permutation of code lengths */
    new Uint8Array([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]);


  if (inflateStateCheck(strm) || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          if (state.wbits === 0) {
            state.wbits = 15;
          }
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        if (len > 15 || len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }

        // !!! pako patch. Force use `options.windowBits` if passed.
        // Required to always use max window size by default.
        state.dmax = 1 << state.wbits;
        //state.dmax = 1 << len;

        state.flags = 0;               /* indicate zlib header */
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if ((state.flags & 0x0200) && (state.wrap & 4)) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Uint8Array(state.head.extra_len);
              }
              state.head.extra.set(
                input.subarray(
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  next + copy
                ),
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if ((state.flags & 0x0200) && (state.wrap & 4)) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if ((state.flags & 0x0200) && (state.wrap & 4)) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 4) && hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          output.set(input.subarray(next, next + copy), put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if ((state.wrap & 4) && _out) {
            strm.adler = state.check =
                /*UPDATE_CHECK(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.wrap & 4) && (state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if ((state.wrap & 4) && hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if ((state.wrap & 4) && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};


const inflateEnd = (strm) => {

  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR;
  }

  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
};


const inflateGetHeader = (strm, head) => {

  /* check state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR; }
  const state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
};


const inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;

  let state;
  let dictid;
  let ret;

  /* check state */
  if (inflateStateCheck(strm)) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
};


module.exports.inflateReset = inflateReset;
module.exports.inflateReset2 = inflateReset2;
module.exports.inflateResetKeep = inflateResetKeep;
module.exports.inflateInit = inflateInit;
module.exports.inflateInit2 = inflateInit2;
module.exports.inflate = inflate;
module.exports.inflateEnd = inflateEnd;
module.exports.inflateGetHeader = inflateGetHeader;
module.exports.inflateSetDictionary = inflateSetDictionary;
module.exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
module.exports.inflateCodesUsed = inflateCodesUsed;
module.exports.inflateCopy = inflateCopy;
module.exports.inflateGetDictionary = inflateGetDictionary;
module.exports.inflateMark = inflateMark;
module.exports.inflatePrime = inflatePrime;
module.exports.inflateSync = inflateSync;
module.exports.inflateSyncPoint = inflateSyncPoint;
module.exports.inflateUndermine = inflateUndermine;
module.exports.inflateValidate = inflateValidate;
*/

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
const BAD = 16209;       /* got a data error -- remain here until reset */
const TYPE = 16191;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  let _in;                    /* local strm.input */
  let last;                   /* have enough input while in < last */
  let _out;                   /* local strm.output */
  let beg;                    /* inflate()'s initial strm.output */
  let end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  let dmax;                   /* maximum distance from zlib header */
//#endif
  let wsize;                  /* window size or zero if not using window */
  let whave;                  /* valid bytes in the window */
  let wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  let s_window;               /* allocated sliding window, if wsize != 0 */
  let hold;                   /* local strm.hold */
  let bits;                   /* local strm.bits */
  let lcode;                  /* local strm.lencode */
  let dcode;                  /* local strm.distcode */
  let lmask;                  /* mask for first level of length codes */
  let dmask;                  /* mask for first level of distance codes */
  let here;                   /* retrieved table entry */
  let op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  let len;                    /* match length, unused bytes */
  let dist;                   /* match distance */
  let from;                   /* where to copy match from */
  let from_source;


  let input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  const state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const MAXBITS = 15;
const ENOUGH_LENS = 852;
const ENOUGH_DISTS = 592;
//const ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

const CODES = 0;
const LENS = 1;
const DISTS = 2;

const lbase = new Uint16Array([ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
]);

const lext = new Uint8Array([ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 199, 75
]);

const dbase = new Uint16Array([ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
]);

const dext = new Uint8Array([ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
]);

const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) =>
{
  const bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  let len = 0;               /* a code's length in bits */
  let sym = 0;               /* index of code symbols */
  let min = 0, max = 0;          /* minimum and maximum code lengths */
  let root = 0;              /* number of index bits for root table */
  let curr = 0;              /* number of index bits for current table */
  let drop = 0;              /* code bits to drop for sub-table */
  let left = 0;                   /* number of prefix codes available */
  let used = 0;              /* code entries in table used */
  let huff = 0;              /* Huffman code */
  let incr;              /* for incrementing code, index */
  let fill;              /* index for replicating entries */
  let low;               /* low bits for current root entry */
  let mask;              /* mask for low root bits */
  let next;             /* next available space in table */
  let base = null;     /* base value table to use */
//  let shoextra;    /* extra bits table to use */
  let match;                  /* use base and extra for symbol >= match */
  const count = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  const offs = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  let extra = null;

  let here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    match = 20;

  } else if (type === LENS) {
    base = lbase;
    extra = lext;
    match = 257;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    match = 0;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


module.exports = inflate_table;

},function(module,exports,__r){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOCBlob = void 0;
const parser_error_1 = __r(3);
const SaveComponent_1 = __r(43);
const SaveEntity_1 = __r(107);
const level_to_destroyed_actors_map_1 = __r(108);
const object_references_list_1 = __r(78);
const save_custom_version_1 = __r(8);
var TOCBlob;
(function (TOCBlob) {
    function SkipOver(reader) {
        const tocBlobBinaryLength = reader.readInt32();
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            reader.readInt32Zero();
        }
        const posBeforeTOCBlob = reader.getBufferPosition();
        reader.skipBytes(tocBlobBinaryLength);
        return {
            position: posBeforeTOCBlob,
            length: tocBlobBinaryLength
        };
    }
    TOCBlob.SkipOver = SkipOver;
    function Read(reader, objectsList) {
        let countObjectHeaders = reader.readInt32();
        const batchSize = 10000;
        let readObjectHeadersCount = 0;
        while (readObjectHeadersCount < countObjectHeaders) {
            objectsList.push(...ReadNObjectHeaders(reader, Math.min(batchSize, countObjectHeaders - readObjectHeadersCount)));
            readObjectHeadersCount += Math.min(batchSize, countObjectHeaders - readObjectHeadersCount);
        }
    }
    TOCBlob.Read = Read;
    function ReadNObjectHeaders(reader, count) {
        let objects = [];
        let objectsRead = 0;
        for (; objectsRead < count; objectsRead++) {
            let obj;
            let objectType = reader.readInt32();
            switch (objectType) {
                case SaveEntity_1.SaveEntity.TypeID:
                    obj = new SaveEntity_1.SaveEntity('', '', '', '');
                    SaveEntity_1.SaveEntity.ParseHeader(reader, obj);
                    break;
                case SaveComponent_1.SaveComponent.TypeID:
                    obj = new SaveComponent_1.SaveComponent('', '', '', '');
                    SaveComponent_1.SaveComponent.ParseHeader(reader, obj);
                    break;
                default:
                    throw new parser_error_1.CorruptSaveError('Unknown object type' + objectType);
            }
            objects.push(obj);
        }
        return objects;
    }
    TOCBlob.ReadNObjectHeaders = ReadNObjectHeaders;
    function Write(writer, level, isPersistentLevel) {
        const lenIndicatorTOCBlob = writer.getBufferPosition();
        writer.writeInt32(0);
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            writer.writeInt32Zero();
        }
        const start = writer.getBufferPosition();
        SerializeAllObjectHeaders(writer, level.objects);
        if (level.writesDestroyedActorsInTOCBlob) {
            if (isPersistentLevel) {
                level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.write(writer, level.destroyedActorsMap ?? {});
            }
            else if (!isPersistentLevel) {
                object_references_list_1.ObjectReferencesList.SerializeList(writer, level.collectables ?? []);
            }
        }
        writer.writeBinarySizeFromPosition(lenIndicatorTOCBlob, start);
    }
    TOCBlob.Write = Write;
    function SerializeAllObjectHeaders(writer, objects) {
        writer.writeInt32(objects.length);
        for (const obj of objects) {
            switch (obj.type) {
                case 'SaveEntity':
                    writer.writeInt32(SaveEntity_1.SaveEntity.TypeID);
                    SaveEntity_1.SaveEntity.SerializeHeader(writer, obj);
                    break;
                case 'SaveComponent':
                    writer.writeInt32(SaveComponent_1.SaveComponent.TypeID);
                    SaveComponent_1.SaveComponent.SerializeHeader(writer, obj);
                    break;
                default:
                    throw new parser_error_1.UnimplementedError(`Unknown object type ${obj.type}. Not implemented.`);
                    break;
            }
        }
    }
    TOCBlob.SerializeAllObjectHeaders = SerializeAllObjectHeaders;
})(TOCBlob || (exports.TOCBlob = TOCBlob = {}));
//# sourceMappingURL=toc-blob.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveComponent = exports.isSaveComponent = void 0;
const SaveObject_1 = __r(44);
const isSaveComponent = (obj) => {
    return obj !== null && typeof obj === 'object' && 'type' in obj && obj.type === 'SaveComponent';
};
exports.isSaveComponent = isSaveComponent;
class SaveComponent extends SaveObject_1.SaveObject {
    constructor(typePath, rootObject, instanceName, parentEntityName = '') {
        super(typePath, rootObject, instanceName);
        this.typePath = typePath;
        this.rootObject = rootObject;
        this.instanceName = instanceName;
        this.parentEntityName = parentEntityName;
        this.type = 'SaveComponent';
    }
    static ParseHeader(reader, obj) {
        SaveObject_1.SaveObject.ParseHeader(reader, obj);
        obj.parentEntityName = reader.readString();
    }
    static SerializeHeader(writer, component) {
        SaveObject_1.SaveObject.SerializeHeader(writer, component);
        writer.writeString(component.parentEntityName);
    }
    static ParseData(component, length, reader, typePath) {
        SaveObject_1.SaveObject.ParseData(component, length, reader, typePath);
    }
}
exports.SaveComponent = SaveComponent;
SaveComponent.TypeID = 0;
//# sourceMappingURL=SaveComponent.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveObject = void 0;
const parser_error_1 = __r(3);
const save_custom_version_1 = __r(8);
const PropertiesList_1 = __r(45);
const SpecialProperties_1 = __r(91);
const FPropertyTag_1 = __r(46);
const GUID_1 = __r(14);
class SaveObject {
    constructor(typePath, rootObject, instanceName, flags) {
        this.typePath = typePath;
        this.rootObject = rootObject;
        this.instanceName = instanceName;
        this.flags = flags;
        this.properties = {};
        this.specialProperties = { type: 'EmptySpecialProperties' };
        this.trailingData = [];
        this.saveCustomVersion = 0;
        this.shouldMigrateObjectRefsToPersistent = false;
    }
    static ParseHeader(reader, obj) {
        obj.typePath = reader.readString();
        obj.rootObject = reader.readString();
        obj.instanceName = reader.readString();
        if (reader.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.SerializeObjectFlags) {
            obj.flags = reader.readUint32();
        }
    }
    static SerializeHeader(writer, obj) {
        writer.writeString(obj.typePath);
        writer.writeString(obj.rootObject);
        writer.writeString(obj.instanceName);
        if (writer.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.SerializeObjectFlags) {
            writer.writeUint32(obj.flags ?? 0);
        }
    }
    static ParseData(obj, length, reader, typePath) {
        const start = reader.getBufferPosition();
        let remainingSize = length;
        if (FPropertyTag_1.FPropertyTag.IsCompletePropertyTagType(reader)) {
            const serializationControl = reader.readByte();
        }
        try {
            obj.properties = PropertiesList_1.PropertiesList.ParseList(reader);
            const hasGuid = reader.readInt32() > 0;
            if (hasGuid) {
                obj.guid = GUID_1.GUID.read(reader);
            }
            remainingSize = length - (reader.getBufferPosition() - start);
            obj.specialProperties = SpecialProperties_1.SpecialProperties.ParseClassSpecificSpecialProperties(reader, typePath, remainingSize);
        }
        catch (error) {
            if (reader.context.throwErrors) {
                throw error;
            }
            else {
                console.warn(`data of object ${obj.instanceName} could not be read fully. Trailing data will be filled with raw bytes.`);
            }
        }
        remainingSize = length - (reader.getBufferPosition() - start);
        if (remainingSize > 0) {
            obj.trailingData = Array.from(reader.readBytes(remainingSize));
        }
        else if (remainingSize < 0) {
            const error = new parser_error_1.ParserError('ParserError', `Unexpected. Read more bytes than are indicated for entity ${obj.instanceName}. bytes left to read is ${remainingSize}`);
            if (reader.context.throwErrors) {
                throw error;
            }
            else {
                console.warn(error);
                reader.skipBytes(-remainingSize);
            }
        }
    }
    static SerializeData(writer, obj) {
        if (FPropertyTag_1.FPropertyTag.IsCompletePropertyTagType(writer)) {
            writer.writeByte(0);
        }
        PropertiesList_1.PropertiesList.SerializeList(writer, obj.properties);
        const hasGuid = obj.guid !== undefined;
        writer.writeInt32(hasGuid ? 1 : 0);
        if (hasGuid) {
            GUID_1.GUID.write(writer, obj.guid);
        }
        SpecialProperties_1.SpecialProperties.SerializeClassSpecificSpecialProperties(writer, obj.typePath, obj.specialProperties);
        writer.writeBytesArray(obj.trailingData);
    }
}
exports.SaveObject = SaveObject;
//# sourceMappingURL=SaveObject.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesList = void 0;
const parser_error_1 = __r(3);
const FPropertyTag_1 = __r(46);
const AbstractBaseProperty_1 = __r(49);
const BoolProperty_1 = __r(50);
const ByteProperty_1 = __r(51);
const ArrayProperty_1 = __r(52);
const MapProperty_1 = __r(82);
const SetProperty_1 = __r(84);
const StructProperty_1 = __r(65);
const DoubleProperty_1 = __r(53);
const EnumProperty_1 = __r(54);
const FloatProperty_1 = __r(55);
const Int64Property_1 = __r(56);
const Int8Property_1 = __r(87);
const InterfaceProperty_1 = __r(57);
const IntProperty_1 = __r(58);
const NameProperty_1 = __r(85);
const ObjectProperty_1 = __r(59);
const SingleProperty_1 = __r(88);
const SoftObjectProperty_1 = __r(60);
const StrProperty_1 = __r(62);
const TextProperty_1 = __r(63);
const Uint32Property_1 = __r(86);
const Uint64Property_1 = __r(89);
const Uint8Property_1 = __r(90);
var PropertiesList;
(function (PropertiesList) {
    function ParseList(reader) {
        const properties = {};
        let parsedProperty = PropertiesList.ParseSingleProperty(reader);
        while (parsedProperty !== null) {
            if (properties[parsedProperty.name]) {
                if (!Array.isArray(properties[parsedProperty.name])) {
                    properties[parsedProperty.name] = [properties[parsedProperty.name]];
                }
                properties[parsedProperty.name].push(parsedProperty);
            }
            else {
                properties[parsedProperty.name] = parsedProperty;
            }
            parsedProperty = PropertiesList.ParseSingleProperty(reader);
        }
        return properties;
    }
    PropertiesList.ParseList = ParseList;
    function SerializeList(writer, properties) {
        for (const property of Object.values(properties).flatMap(val => Array.isArray(val) ? val : [val])) {
            PropertiesList.SerializeSingleProperty(writer, property);
        }
        writer.writeString('None');
    }
    PropertiesList.SerializeList = SerializeList;
    function ParseSingleProperty(reader) {
        const tag = FPropertyTag_1.FPropertyTag.read(reader);
        if (tag.propertyName === 'None') {
            return null;
        }
        let property = AbstractBaseProperty_1.AbstractBaseProperty.CreateFromTag(tag);
        const before = reader.getBufferPosition();
        try {
            switch (property.propertyTagType.name) {
                case 'BoolProperty':
                    BoolProperty_1.BoolProperty.Parse(reader, property, tag);
                    break;
                case 'ByteProperty':
                    ByteProperty_1.ByteProperty.Parse(reader, property, tag);
                    break;
                case 'Int8Property':
                    Int8Property_1.Int8Property.Parse(reader, property);
                    break;
                case 'UInt8Property':
                    Uint8Property_1.Uint8Property.Parse(reader, property);
                    break;
                case 'IntProperty':
                    IntProperty_1.IntProperty.Parse(reader, property);
                    break;
                case 'UInt32Property':
                    Uint32Property_1.Uint32Property.Parse(reader, property);
                    break;
                case 'Int64Property':
                    Int64Property_1.Int64Property.Parse(reader, property);
                    break;
                case 'UInt64Property':
                    Uint64Property_1.Uint64Property.Parse(reader, property);
                    break;
                case 'SingleProperty':
                    SingleProperty_1.SingleProperty.Parse(reader, property);
                    break;
                case 'FloatProperty':
                    FloatProperty_1.FloatProperty.Parse(reader, property);
                    break;
                case 'DoubleProperty':
                    DoubleProperty_1.DoubleProperty.Parse(reader, property);
                    break;
                case 'StrProperty':
                    StrProperty_1.StrProperty.Parse(reader, property);
                    break;
                case 'NameProperty':
                    NameProperty_1.NameProperty.Parse(reader, property);
                    break;
                case 'ObjectProperty':
                    ObjectProperty_1.ObjectProperty.Parse(reader, property);
                    break;
                case 'InterfaceProperty':
                    InterfaceProperty_1.InterfaceProperty.Parse(reader, property);
                    break;
                case 'SoftObjectProperty':
                    SoftObjectProperty_1.SoftObjectProperty.Parse(reader, property);
                    break;
                case 'EnumProperty':
                    EnumProperty_1.EnumProperty.Parse(reader, property, tag);
                    break;
                case 'StructProperty':
                    StructProperty_1.StructProperty.Parse(reader, property, tag);
                    break;
                case 'ArrayProperty':
                    ArrayProperty_1.ArrayProperty.Parse(reader, tag, property);
                    break;
                case 'MapProperty':
                    MapProperty_1.MapProperty.Parse(reader, property);
                    break;
                case 'TextProperty':
                    TextProperty_1.TextProperty.Parse(reader, property);
                    break;
                case 'SetProperty':
                    SetProperty_1.SetProperty.Parse(reader, property);
                    break;
                default:
                    throw new Error(`Unimplemented type ${property.propertyTagType.name}, at byte position ${reader.getBufferPosition()}`);
            }
            const readBytes = reader.getBufferPosition() - before;
            if (readBytes !== tag.binarySize) {
                throw new parser_error_1.ParserError('ParserError', `Property possibly corrupt. Read ${readBytes} bytes for ${property.propertyTagType.name} ${property.name}, but ${tag.binarySize} bytes were indicated.`);
            }
        }
        catch (error) {
            if (reader.context.throwErrors) {
                throw error;
            }
            else {
                console.warn(`property ${tag.propertyName} of type ${property.propertyTagType.name} is therefore dumped as raw bytes.`);
                reader.skipBytes(before - reader.getBufferPosition());
                property.rawBytes = Array.from(reader.readBytes(tag.binarySize));
            }
        }
        return property;
    }
    PropertiesList.ParseSingleProperty = ParseSingleProperty;
    function SerializeSingleProperty(writer, property) {
        if (property.rawBytes !== undefined) {
            writer.writeBytesArray(property.rawBytes);
            return;
        }
        const { binarySizeLocation } = FPropertyTag_1.FPropertyTag.writeFromProperty(writer, property);
        const start = writer.getBufferPosition();
        switch (property.propertyTagType.name) {
            case 'BoolProperty':
                BoolProperty_1.BoolProperty.Serialize(writer, property);
                break;
            case 'ByteProperty':
                ByteProperty_1.ByteProperty.Serialize(writer, property);
                break;
            case 'Int8Property':
                Int8Property_1.Int8Property.Serialize(writer, property);
                break;
            case 'UInt8Property':
                Uint8Property_1.Uint8Property.Serialize(writer, property);
                break;
            case 'IntProperty':
                IntProperty_1.IntProperty.Serialize(writer, property);
                break;
            case 'UInt32Property':
                Uint32Property_1.Uint32Property.Serialize(writer, property);
                break;
            case 'Int64Property':
                Int64Property_1.Int64Property.Serialize(writer, property);
                break;
            case 'UInt64PRoperty':
                Uint64Property_1.Uint64Property.Serialize(writer, property);
                break;
            case 'SingleProperty':
            case 'FloatProperty':
                FloatProperty_1.FloatProperty.Serialize(writer, property);
                break;
            case 'DoubleProperty':
                DoubleProperty_1.DoubleProperty.Serialize(writer, property);
                break;
            case 'StrProperty':
            case 'NameProperty':
                StrProperty_1.StrProperty.Serialize(writer, property);
                break;
            case 'ObjectProperty':
            case 'InterfaceProperty':
                ObjectProperty_1.ObjectProperty.Serialize(writer, property);
                break;
            case 'SoftObjectProperty':
                SoftObjectProperty_1.SoftObjectProperty.Serialize(writer, property);
                break;
            case 'EnumProperty':
                EnumProperty_1.EnumProperty.Serialize(writer, property);
                break;
            case 'StructProperty':
                StructProperty_1.StructProperty.Serialize(writer, property);
                break;
            case 'ArrayProperty':
                ArrayProperty_1.ArrayProperty.Serialize(writer, property);
                break;
            case 'MapProperty':
                MapProperty_1.MapProperty.Serialize(writer, property);
                break;
            case 'TextProperty':
                TextProperty_1.TextProperty.Serialize(writer, property);
                break;
            case 'SetProperty':
                SetProperty_1.SetProperty.Serialize(writer, property);
                break;
            default:
                throw new Error(`Unimplemented type ${property.propertyTagType.name}`);
        }
        writer.writeBinarySizeFromPosition(binarySizeLocation, start);
    }
    PropertiesList.SerializeSingleProperty = SerializeSingleProperty;
})(PropertiesList || (exports.PropertiesList = PropertiesList = {}));
//# sourceMappingURL=PropertiesList.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPropertyTag = void 0;
const EUnrealEngineObjectUE5Version_1 = __r(24);
const save_custom_version_1 = __r(8);
const GUIDInfo_1 = __r(47);
const FPropertyTagNode_1 = __r(48);
const GUID_1 = __r(14);
var FPropertyTag;
(function (FPropertyTag) {
    function IsCompletePropertyTagType(readerOrWriter) {
        return readerOrWriter.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions
            && readerOrWriter.context.packageFileVersionUE5.object >= EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.PROPERTY_TAG_COMPLETE_TYPE_NAME;
    }
    FPropertyTag.IsCompletePropertyTagType = IsCompletePropertyTagType;
    function read(reader) {
        const tag = {
            propertyName: reader.readString(),
            binarySize: 0,
            propertyTagType: { name: '', children: [] }
        };
        if (tag.propertyName === 'None') {
            return tag;
        }
        if (IsCompletePropertyTagType(reader)) {
            tag.propertyTagType = FPropertyTagNode_1.FPropertyTagNode.read(reader);
            tag.binarySize = reader.readInt32();
            tag.flags = reader.readUint8();
            if (tag.flags & 0x1) {
                tag.index = reader.readInt32();
            }
            if (tag.flags & 0x2) {
                tag.propertyGuid = GUID_1.GUID.read(reader);
            }
        }
        else {
            tag.propertyType = reader.readString();
            tag.binarySize = reader.readInt32();
            tag.index = reader.readInt32();
            if (tag.propertyType === 'ArrayProperty') {
                tag.subtype = reader.readString();
            }
            else if (tag.propertyType === 'StructProperty') {
                tag.subtype = reader.readString();
                tag.structGuid = GUID_1.GUID.read(reader);
            }
            else if (tag.propertyType === 'SetProperty') {
                tag.subtype = reader.readString();
            }
            else if (tag.propertyType === 'BoolProperty') {
                tag.boolValue = reader.readInt8() > 0;
            }
            else if (tag.propertyType === 'ByteProperty') {
                tag.byteValueEnumName = reader.readString();
            }
            else if (tag.propertyType === 'EnumProperty') {
                tag.enumValueEnumName = reader.readString();
            }
            else if (tag.propertyType === 'MapProperty') {
                tag.mapKeyType = reader.readString();
                tag.mapValueType = reader.readString();
            }
            tag.propertyGuid = GUIDInfo_1.OptionalGUID.read(reader);
            tag.propertyTagType = {
                name: tag.propertyType,
                children: []
            };
            if (tag.subtype !== undefined) {
                tag.propertyTagType.children.push({
                    name: tag.subtype,
                    children: []
                });
            }
            else if (tag.mapKeyType !== undefined && tag.mapValueType !== undefined) {
                tag.propertyTagType.children.push({
                    name: tag.mapKeyType,
                    children: []
                }, {
                    name: tag.mapValueType,
                    children: []
                });
            }
        }
        return tag;
    }
    FPropertyTag.read = read;
    function write(writer, tag) {
        writer.writeString(tag.propertyName);
        if (IsCompletePropertyTagType(writer)) {
            FPropertyTagNode_1.FPropertyTagNode.write(writer, tag.propertyTagType);
            writer.writeInt32(tag.binarySize);
            writer.writeUint8(tag.flags ?? 0);
            if (tag.flags & 0x1) {
                writer.writeInt32(tag.index);
            }
            if (tag.flags & 0x2) {
                GUID_1.GUID.write(writer, tag.propertyGuid);
            }
        }
        else {
            writer.writeString(tag.propertyType);
            writer.writeInt32(tag.binarySize);
            writer.writeInt32(tag.index ?? 0);
            if (tag.propertyType === 'ArrayProperty') {
                writer.writeString(tag.subtype);
            }
            else if (tag.propertyType === 'StructProperty') {
                writer.writeString(tag.subtype);
                GUID_1.GUID.write(writer, tag.structGuid);
            }
            else if (tag.propertyType === 'SetProperty') {
                writer.writeString(tag.subtype);
            }
            else if (tag.propertyType === 'BoolProperty') {
                writer.writeInt8(tag.boolValue ? 1 : 0);
            }
            else if (tag.propertyType === 'ByteProperty') {
                writer.writeString(tag.byteValueEnumName);
            }
            else if (tag.propertyType === 'EnumProperty') {
                writer.writeString(tag.enumValueEnumName);
            }
            else if (tag.propertyType === 'MapProperty') {
                writer.writeString(tag.mapKeyType);
                writer.writeString(tag.mapValueType);
            }
            GUIDInfo_1.OptionalGUID.write(writer, tag.propertyGuid);
        }
    }
    FPropertyTag.write = write;
    function writeFromProperty(writer, property) {
        writer.writeString(property.name);
        let binarySizeLocation = writer.getBufferPosition();
        if (IsCompletePropertyTagType(writer)) {
            FPropertyTagNode_1.FPropertyTagNode.write(writer, property.propertyTagType);
            binarySizeLocation = writer.getBufferPosition();
            writer.writeInt32(0);
            writer.writeUint8(property.flags ?? 0);
            if (property.flags & 0x1) {
                writer.writeInt32(property.index);
            }
            if (property.flags & 0x2) {
                GUID_1.GUID.write(writer, property.propertyGuid);
            }
        }
        else {
            writer.writeString(property.propertyTagType.name);
            binarySizeLocation = writer.getBufferPosition();
            writer.writeInt32(0);
            writer.writeInt32(property.index ?? 0);
            if (property.propertyTagType.name === 'ArrayProperty') {
                writer.writeString(property.propertyTagType.children[0].name);
            }
            else if (property.propertyTagType.name === 'StructProperty') {
                writer.writeString(property.propertyTagType.children[0].name);
                GUID_1.GUID.write(writer, property.structGuid ?? [0, 0, 0, 0]);
            }
            else if (property.propertyTagType.name === 'SetProperty') {
                writer.writeString(property.propertyTagType.children[0].name);
            }
            else if (property.propertyTagType.name === 'BoolProperty') {
                writer.writeInt8(property.value ? 1 : 0);
            }
            else if (property.propertyTagType.name === 'ByteProperty') {
                writer.writeString(property.value.type);
            }
            else if (property.propertyTagType.name === 'EnumProperty') {
                writer.writeString(property.value.name);
            }
            else if (property.propertyTagType.name === 'MapProperty') {
                writer.writeString(property.propertyTagType.children[0].name);
                writer.writeString(property.propertyTagType.children[1].name);
            }
            GUIDInfo_1.OptionalGUID.write(writer, property.propertyGuid);
        }
        return {
            binarySizeLocation
        };
    }
    FPropertyTag.writeFromProperty = writeFromProperty;
})(FPropertyTag || (exports.FPropertyTag = FPropertyTag = {}));
//# sourceMappingURL=FPropertyTag.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalGUID = void 0;
const GUID_1 = __r(14);
var OptionalGUID;
(function (OptionalGUID) {
    OptionalGUID.read = (reader) => {
        if (reader.readByte() === 1) {
            return GUID_1.GUID.read(reader);
        }
        else {
            return undefined;
        }
    };
    OptionalGUID.write = (writer, guid) => {
        if (guid === undefined) {
            writer.writeByte(0);
            return;
        }
        else {
            writer.writeByte(1);
            GUID_1.GUID.write(writer, guid);
        }
    };
})(OptionalGUID || (exports.OptionalGUID = OptionalGUID = {}));
;
//# sourceMappingURL=GUIDInfo.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPropertyTagNode = void 0;
var FPropertyTagNode;
(function (FPropertyTagNode) {
    function read(reader) {
        const name = reader.readString();
        const count = reader.readInt32();
        const children = new Array(count).fill('0').map(() => FPropertyTagNode.read(reader));
        return {
            name,
            children
        };
    }
    FPropertyTagNode.read = read;
    function write(writer, node) {
        writer.writeString(node.name);
        writer.writeInt32(node.children.length);
        for (const child of node.children) {
            FPropertyTagNode.write(writer, child);
        }
    }
    FPropertyTagNode.write = write;
})(FPropertyTagNode || (exports.FPropertyTagNode = FPropertyTagNode = {}));
;
//# sourceMappingURL=FPropertyTagNode.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBaseProperty = void 0;
var AbstractBaseProperty;
(function (AbstractBaseProperty) {
    function CreateFromTag(tag) {
        return {
            type: tag.propertyTagType.name,
            name: tag.propertyName,
            propertyTagType: tag.propertyTagType,
            ...(tag.index && tag.index !== 0 && { index: tag.index }),
            ...(tag.propertyGuid !== undefined && tag.propertyGuid.some(number => number !== 0) && { propertyGuid: tag.propertyGuid }),
            ...(tag.structGuid !== undefined && tag.structGuid.some(number => number !== 0) && { structGuid: tag.structGuid }),
            ...(tag.flags !== undefined && tag.flags !== 0 && { flags: tag.flags }),
        };
    }
    AbstractBaseProperty.CreateFromTag = CreateFromTag;
})(AbstractBaseProperty || (exports.AbstractBaseProperty = AbstractBaseProperty = {}));
//# sourceMappingURL=AbstractBaseProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolProperty = exports.isBoolProperty = void 0;
const FPropertyTag_1 = __r(46);
const isBoolProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'BoolProperty';
exports.isBoolProperty = isBoolProperty;
var BoolProperty;
(function (BoolProperty) {
    function Parse(reader, property, tag) {
        if (FPropertyTag_1.FPropertyTag.IsCompletePropertyTagType(reader)) {
            property.value = (tag.flags & 0x10) === 1;
        }
        else {
            property.value = tag.boolValue;
        }
    }
    BoolProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readByte() > 0;
    }
    BoolProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
    }
    BoolProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeByte(value ? 1 : 0);
    }
    BoolProperty.SerializeValue = SerializeValue;
})(BoolProperty || (exports.BoolProperty = BoolProperty = {}));
//# sourceMappingURL=BoolProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteProperty = exports.isByteProperty = void 0;
const FPropertyTag_1 = __r(46);
const isByteProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'ByteProperty';
exports.isByteProperty = isByteProperty;
var ByteProperty;
(function (ByteProperty) {
    function Parse(reader, property, tag) {
        if (FPropertyTag_1.FPropertyTag.IsCompletePropertyTagType(reader)) {
            if (tag.propertyTagType.children.length === 0) {
                property.value = {
                    type: tag.byteValueEnumName,
                    value: ReadValue(reader)
                };
            }
            else {
                property.value = {
                    type: tag.propertyTagType.children[0].name,
                    value: reader.readString()
                };
            }
        }
        else {
            if (tag.byteValueEnumName === 'None') {
                property.value = {
                    type: tag.byteValueEnumName,
                    value: ReadValue(reader)
                };
            }
            else {
                property.value = {
                    type: tag.byteValueEnumName,
                    value: reader.readString()
                };
            }
        }
    }
    ByteProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readByte();
    }
    ByteProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        if (FPropertyTag_1.FPropertyTag.IsCompletePropertyTagType(writer)) {
            if (property.propertyTagType.children.length === 0) {
                SerializeValue(writer, property.value.value);
            }
            else {
                writer.writeString(property.value.value);
            }
        }
        else {
            if (property.value.type === 'None') {
                SerializeValue(writer, property.value.value);
            }
            else {
                writer.writeString(property.value.value);
            }
        }
    }
    ByteProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeByte(value);
    }
    ByteProperty.SerializeValue = SerializeValue;
})(ByteProperty || (exports.ByteProperty = ByteProperty = {}));
//# sourceMappingURL=ByteProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayProperty = exports.isArrayProperty = void 0;
const parser_error_1 = __r(3);
const save_custom_version_1 = __r(8);
const FPropertyTag_1 = __r(46);
const BoolProperty_1 = __r(50);
const ByteProperty_1 = __r(51);
const DoubleProperty_1 = __r(53);
const EnumProperty_1 = __r(54);
const FloatProperty_1 = __r(55);
const Int64Property_1 = __r(56);
const InterfaceProperty_1 = __r(57);
const IntProperty_1 = __r(58);
const ObjectProperty_1 = __r(59);
const SoftObjectProperty_1 = __r(60);
const StrProperty_1 = __r(62);
const TextProperty_1 = __r(63);
const StructProperty_1 = __r(65);
const isArrayProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'ArrayProperty';
exports.isArrayProperty = isArrayProperty;
var ArrayProperty;
(function (ArrayProperty) {
    function Parse(reader, tag, property) {
        const elementCount = reader.readInt32();
        switch (property.propertyTagType.children[0].name) {
            case "FloatProperty":
                property.values = new Array(elementCount).fill(0).map(() => FloatProperty_1.FloatProperty.ReadValue(reader));
                break;
            case "BoolProperty":
                property.values = new Array(elementCount).fill(0).map(() => BoolProperty_1.BoolProperty.ReadValue(reader));
                break;
            case "IntProperty":
                property.values = new Array(elementCount).fill(0).map(() => IntProperty_1.IntProperty.ReadValue(reader));
                break;
            case "Int64Property":
                property.values = new Array(elementCount).fill(0).map(() => Int64Property_1.Int64Property.ReadValue(reader));
                break;
            case "DoubleProperty":
                property.values = new Array(elementCount).fill(0).map(() => DoubleProperty_1.DoubleProperty.ReadValue(reader));
                break;
            case "ByteProperty":
                property.values = new Array(elementCount).fill(0).map(() => ByteProperty_1.ByteProperty.ReadValue(reader));
                break;
            case "StrProperty":
                property.values = new Array(elementCount).fill(0).map(() => StrProperty_1.StrProperty.ReadValue(reader));
                break;
            case "EnumProperty":
                property.values = new Array(elementCount).fill(0).map(() => EnumProperty_1.EnumProperty.ReadValue(reader));
                break;
            case "TextProperty":
                property.values = new Array(elementCount).fill(0).map(() => TextProperty_1.TextProperty.ReadValue(reader));
                break;
            case "InterfaceProperty":
                property.values = new Array(elementCount).fill(0).map(() => InterfaceProperty_1.InterfaceProperty.ReadValue(reader));
                break;
            case "ObjectProperty":
                property.values = new Array(elementCount).fill(0).map(() => ObjectProperty_1.ObjectProperty.ReadValue(reader));
                break;
            case "SoftObjectProperty":
                property.values = new Array(elementCount).fill(0).map(() => SoftObjectProperty_1.SoftObjectProperty.ReadValue(reader));
                break;
            case "StructProperty":
                let binarySizeToCheck = tag.binarySize - 4;
                if (reader.context.saveVersion.object < save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                    const innerTag = FPropertyTag_1.FPropertyTag.read(reader);
                    property.structTag = innerTag;
                    property.propertyTagType.children[0] = innerTag.propertyTagType;
                    binarySizeToCheck = property.structTag.binarySize;
                }
                property.values = new Array(elementCount).fill(0).map(() => StructProperty_1.StructProperty.ParseValue(reader, tag.propertyTagType.children[0].children[0], binarySizeToCheck));
                break;
            default:
                throw new parser_error_1.UnimplementedError(`Unknown array property subtype ${JSON.stringify(property.propertyTagType.children[0].name)} for ${property.propertyTagType.name}. Not implemented.`);
        }
    }
    ArrayProperty.Parse = Parse;
    function Serialize(writer, property) {
        writer.writeInt32(property.values.length);
        switch (property.propertyTagType.children[0].name) {
            case "FloatProperty":
                property.values.forEach(value => FloatProperty_1.FloatProperty.SerializeValue(writer, value));
                break;
            case "BoolProperty":
                property.values.forEach(value => BoolProperty_1.BoolProperty.SerializeValue(writer, value));
                break;
            case "IntProperty":
                property.values.forEach(value => IntProperty_1.IntProperty.SerializeValue(writer, value));
                break;
            case "Int64Property":
                property.values.forEach(value => Int64Property_1.Int64Property.SerializeValue(writer, value));
                break;
            case "DoubleProperty":
                property.values.forEach(value => DoubleProperty_1.DoubleProperty.SerializeValue(writer, value));
                break;
            case "ByteProperty":
                property.values.forEach(value => ByteProperty_1.ByteProperty.SerializeValue(writer, value));
                break;
            case "StrProperty":
                property.values.forEach(value => StrProperty_1.StrProperty.SerializeValue(writer, value));
                break;
            case "EnumProperty":
                property.values.forEach(value => EnumProperty_1.EnumProperty.SerializeValue(writer, value));
                break;
            case "TextProperty":
                property.values.forEach(value => TextProperty_1.TextProperty.SerializeValue(writer, value));
                break;
            case "InterfaceProperty":
                property.values.forEach(value => InterfaceProperty_1.InterfaceProperty.SerializeValue(writer, value));
                break;
            case "ObjectProperty":
                property.values.forEach(value => ObjectProperty_1.ObjectProperty.SerializeValue(writer, value));
                break;
            case "SoftObjectProperty":
                property.values.forEach(value => SoftObjectProperty_1.SoftObjectProperty.SerializeValue(writer, value));
                break;
            case "StructProperty":
                if (writer.context.saveVersion.object < save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                    FPropertyTag_1.FPropertyTag.write(writer, property.structTag);
                }
                property.values.forEach(value => StructProperty_1.StructProperty.SerializeValue(writer, property.propertyTagType.children[0].children[0].name, value));
                break;
            default:
                throw new parser_error_1.UnimplementedError(`Unknown array property to serialize. ${property.type ?? ''}, ${property.subtype ?? ''}`);
        }
    }
    ArrayProperty.Serialize = Serialize;
})(ArrayProperty || (exports.ArrayProperty = ArrayProperty = {}));
//# sourceMappingURL=ArrayProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleProperty = exports.isDoubleProperty = void 0;
const isDoubleProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'DoubleProperty';
exports.isDoubleProperty = isDoubleProperty;
var DoubleProperty;
(function (DoubleProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    DoubleProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readDouble();
    }
    DoubleProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    DoubleProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeDouble(value);
    }
    DoubleProperty.SerializeValue = SerializeValue;
})(DoubleProperty || (exports.DoubleProperty = DoubleProperty = {}));
//# sourceMappingURL=DoubleProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumProperty = exports.isEnumProperty = void 0;
const isEnumProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'EnumProperty';
exports.isEnumProperty = isEnumProperty;
var EnumProperty;
(function (EnumProperty) {
    function Parse(reader, property, tag) {
        property.value = {
            name: tag.enumValueEnumName,
            value: ReadValue(reader)
        };
    }
    EnumProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readString();
    }
    EnumProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value.value);
    }
    EnumProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeString(value);
    }
    EnumProperty.SerializeValue = SerializeValue;
})(EnumProperty || (exports.EnumProperty = EnumProperty = {}));
//# sourceMappingURL=EnumProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatProperty = exports.isFloatProperty = void 0;
const isFloatProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'FloatProperty';
exports.isFloatProperty = isFloatProperty;
var FloatProperty;
(function (FloatProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    FloatProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readFloat32();
    }
    FloatProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    FloatProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeFloat32(value);
    }
    FloatProperty.SerializeValue = SerializeValue;
})(FloatProperty || (exports.FloatProperty = FloatProperty = {}));
//# sourceMappingURL=FloatProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Int64Property = exports.isInt64Property = void 0;
const isInt64Property = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'Int64Property';
exports.isInt64Property = isInt64Property;
var Int64Property;
(function (Int64Property) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    Int64Property.Parse = Parse;
    function ReadValue(reader) {
        return reader.readInt64().toString();
    }
    Int64Property.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    Int64Property.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeInt64(BigInt(value));
    }
    Int64Property.SerializeValue = SerializeValue;
})(Int64Property || (exports.Int64Property = Int64Property = {}));
//# sourceMappingURL=Int64Property.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceProperty = exports.isInterfaceProperty = void 0;
const ObjectReference_1 = __r(17);
const isInterfaceProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'InterfaceProperty';
exports.isInterfaceProperty = isInterfaceProperty;
var InterfaceProperty;
(function (InterfaceProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    InterfaceProperty.Parse = Parse;
    function ReadValue(reader) {
        return ObjectReference_1.ObjectReference.read(reader);
    }
    InterfaceProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    InterfaceProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        ObjectReference_1.ObjectReference.write(writer, value);
    }
    InterfaceProperty.SerializeValue = SerializeValue;
})(InterfaceProperty || (exports.InterfaceProperty = InterfaceProperty = {}));
//# sourceMappingURL=InterfaceProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntProperty = exports.isIntProperty = void 0;
const isIntProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'IntProperty';
exports.isIntProperty = isIntProperty;
var IntProperty;
(function (IntProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    IntProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readInt32();
    }
    IntProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    IntProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeInt32(value);
    }
    IntProperty.SerializeValue = SerializeValue;
})(IntProperty || (exports.IntProperty = IntProperty = {}));
//# sourceMappingURL=IntProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectProperty = exports.isObjectProperty = void 0;
const ObjectReference_1 = __r(17);
const isObjectProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'ObjectProperty';
exports.isObjectProperty = isObjectProperty;
var ObjectProperty;
(function (ObjectProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    ObjectProperty.Parse = Parse;
    function ReadValue(reader) {
        return ObjectReference_1.ObjectReference.read(reader);
    }
    ObjectProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    ObjectProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        ObjectReference_1.ObjectReference.write(writer, value);
    }
    ObjectProperty.SerializeValue = SerializeValue;
})(ObjectProperty || (exports.ObjectProperty = ObjectProperty = {}));
//# sourceMappingURL=ObjectProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftObjectProperty = exports.isSoftObjectProperty = void 0;
const SoftObjectReference_1 = __r(61);
const isSoftObjectProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'SoftObjectProperty';
exports.isSoftObjectProperty = isSoftObjectProperty;
var SoftObjectProperty;
(function (SoftObjectProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    SoftObjectProperty.Parse = Parse;
    function ReadValue(reader) {
        return SoftObjectReference_1.SoftObjectReference.read(reader);
    }
    SoftObjectProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    SoftObjectProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        SoftObjectReference_1.SoftObjectReference.write(writer, value);
    }
    SoftObjectProperty.SerializeValue = SerializeValue;
})(SoftObjectProperty || (exports.SoftObjectProperty = SoftObjectProperty = {}));
//# sourceMappingURL=SoftObjectProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftObjectReference = void 0;
var SoftObjectReference;
(function (SoftObjectReference) {
    SoftObjectReference.read = (reader) => {
        return {
            pathName: reader.readString(),
            instanceName: reader.readString(),
            subPathString: reader.readInt32()
        };
    };
    SoftObjectReference.write = (writer, ref) => {
        writer.writeString(ref.pathName);
        writer.writeString(ref.instanceName);
        writer.writeInt32(ref.subPathString);
    };
})(SoftObjectReference || (exports.SoftObjectReference = SoftObjectReference = {}));
;
//# sourceMappingURL=SoftObjectReference.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrProperty = exports.isStrProperty = void 0;
const isStrProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'StrProperty';
exports.isStrProperty = isStrProperty;
var StrProperty;
(function (StrProperty) {
    function Parse(reader, currentProperty) {
        currentProperty.value = ReadValue(reader);
    }
    StrProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readString();
    }
    StrProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    StrProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeString(value);
    }
    StrProperty.SerializeValue = SerializeValue;
})(StrProperty || (exports.StrProperty = StrProperty = {}));
//# sourceMappingURL=StrProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProperty = exports.isTextProperty = void 0;
const ETextHistoryType_1 = __r(64);
const isTextProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'TextProperty';
exports.isTextProperty = isTextProperty;
var TextProperty;
(function (TextProperty) {
    function Parse(reader, property) {
        property.value = TextProperty.ReadValue(reader);
    }
    TextProperty.Parse = Parse;
    function ReadValue(reader) {
        const prop = {
            flags: reader.readUint32(),
            historyType: reader.readInt8()
        };
        switch (prop.historyType) {
            case ETextHistoryType_1.ETextHistoryType.Base:
                prop.namespace = reader.readString();
                prop.key = reader.readString();
                prop.value = reader.readString();
                break;
            case ETextHistoryType_1.ETextHistoryType.NamedFormat:
            case ETextHistoryType_1.ETextHistoryType.ArgumentFormat:
                prop.sourceFmt = ReadValue(reader);
                const argumentsCount = reader.readInt32();
                prop.arguments = [];
                for (let i = 0; i < argumentsCount; i++) {
                    let currentArgumentsData = {};
                    currentArgumentsData.name = reader.readString();
                    currentArgumentsData.valueType = reader.readByte();
                    switch (currentArgumentsData.valueType) {
                        case 4:
                            currentArgumentsData.argumentValue = ReadValue(reader);
                            break;
                        default:
                            throw new Error('Unimplemented FormatArgumentType `' + currentArgumentsData.valueType);
                    }
                    prop.arguments.push(currentArgumentsData);
                }
                break;
            case ETextHistoryType_1.ETextHistoryType.Transform:
                prop.sourceText = ReadValue(reader);
                prop.transformType = reader.readByte();
                break;
            case ETextHistoryType_1.ETextHistoryType.StringTableEntry:
                prop.tableId = reader.readString();
                prop.textKey = reader.readString();
                break;
            case ETextHistoryType_1.ETextHistoryType.None:
                prop.hasCultureInvariantString = reader.readInt32() === 1;
                if (prop.hasCultureInvariantString) {
                    prop.value = reader.readString();
                }
                break;
            default:
                throw new Error('Unimplemented TextProperty historyType ' + prop.historyType);
        }
        return prop;
    }
    TextProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    TextProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeUint32(value.flags);
        writer.writeInt8(value.historyType);
        switch (value.historyType) {
            case ETextHistoryType_1.ETextHistoryType.Base:
                writer.writeString(value.namespace);
                writer.writeString(value.key);
                writer.writeString(value.value);
                break;
            case ETextHistoryType_1.ETextHistoryType.NamedFormat:
            case ETextHistoryType_1.ETextHistoryType.ArgumentFormat:
                SerializeValue(writer, value.sourceFmt);
                writer.writeInt32(value.arguments.length);
                for (const arg of value.arguments) {
                    let currentArgumentsData = {};
                    writer.writeString(arg.name);
                    writer.writeByte(arg.valueType);
                    switch (arg.valueType) {
                        case 4:
                            SerializeValue(writer, arg.argumentValue);
                            break;
                        default:
                            throw new Error('Unimplemented FormatArgumentType `' + currentArgumentsData.valueType);
                    }
                }
                break;
            case ETextHistoryType_1.ETextHistoryType.Transform:
                SerializeValue(writer, value.sourceText);
                writer.writeByte(value.transformType);
                break;
            case ETextHistoryType_1.ETextHistoryType.StringTableEntry:
                writer.writeString(value.tableId);
                writer.writeString(value.textKey);
                break;
            case ETextHistoryType_1.ETextHistoryType.None:
                writer.writeInt32(value.hasCultureInvariantString ? 1 : 0);
                if (value.hasCultureInvariantString) {
                    writer.writeString(value.value);
                }
                break;
            default:
                throw new Error('Unimplemented historyType `' + value.historyType);
        }
    }
    TextProperty.SerializeValue = SerializeValue;
})(TextProperty || (exports.TextProperty = TextProperty = {}));
//# sourceMappingURL=TextProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETextHistoryType = void 0;
var ETextHistoryType;
(function (ETextHistoryType) {
    ETextHistoryType[ETextHistoryType["None"] = -1] = "None";
    ETextHistoryType[ETextHistoryType["Base"] = 0] = "Base";
    ETextHistoryType[ETextHistoryType["NamedFormat"] = 1] = "NamedFormat";
    ETextHistoryType[ETextHistoryType["OrderedFormat"] = 2] = "OrderedFormat";
    ETextHistoryType[ETextHistoryType["ArgumentFormat"] = 3] = "ArgumentFormat";
    ETextHistoryType[ETextHistoryType["AsNumber"] = 4] = "AsNumber";
    ETextHistoryType[ETextHistoryType["AsPercent"] = 5] = "AsPercent";
    ETextHistoryType[ETextHistoryType["AsCurrency"] = 6] = "AsCurrency";
    ETextHistoryType[ETextHistoryType["AsDate"] = 7] = "AsDate";
    ETextHistoryType[ETextHistoryType["AsTime"] = 8] = "AsTime";
    ETextHistoryType[ETextHistoryType["AsDateTime"] = 9] = "AsDateTime";
    ETextHistoryType[ETextHistoryType["Transform"] = 10] = "Transform";
    ETextHistoryType[ETextHistoryType["StringTableEntry"] = 11] = "StringTableEntry";
    ETextHistoryType[ETextHistoryType["TextGenerator"] = 12] = "TextGenerator";
})(ETextHistoryType || (exports.ETextHistoryType = ETextHistoryType = {}));
//# sourceMappingURL=ETextHistoryType.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructProperty = exports.isStructProperty = void 0;
const save_custom_version_1 = __r(8);
const FClientIdentityInfo_1 = __r(66);
const FColor_1 = __r(67);
const FInventoryItem_1 = __r(68);
const FLinearColor_1 = __r(71);
const FPlayerInfoHandle_1 = __r(6);
const FUniqueNetIdRepl_1 = __r(72);
const GUID_1 = __r(14);
const DynamicStructPropertyValue_1 = __r(73);
const FICFrameRange_1 = __r(74);
const FINDynamicStructHolder_1 = __r(75);
const FINGPUT1BufferPixel_1 = __r(76);
const FINLuaRuntimePersistenceState_1 = __r(77);
const FINNetworkTrace_1 = __r(79);
const FLBBalancerIndexing_1 = __r(80);
const vec2_1 = __r(19);
const vec3_1 = __r(18);
const vec4_1 = __r(81);
const isStructProperty = (property) => !Array.isArray(property) && property.propertyTagType.name === 'StructProperty';
exports.isStructProperty = isStructProperty;
var StructProperty;
(function (StructProperty) {
    function Parse(reader, property, tag) {
        const before = reader.getBufferPosition();
        property.value = ParseValue(reader, property.propertyTagType.children[0], tag.binarySize);
        const readBytes = reader.getBufferPosition() - before;
        if (readBytes !== tag.binarySize) {
            if (tag.binarySize - readBytes === 4) {
                reader.skipBytes(tag.binarySize - readBytes);
            }
            else {
                throw new Error(`possibly corrupt. Read ${readBytes} for structproperty of ${JSON.stringify(property.propertyTagType.children[0].name)}, but ${tag.binarySize} were indicated.`);
            }
        }
    }
    StructProperty.Parse = Parse;
    function ParseValue(reader, propertyTagType, size) {
        let value;
        switch (propertyTagType.name) {
            case 'Color':
                value = FColor_1.FColor.read(reader);
                break;
            case 'IntPoint':
                value = reader.readInt64().toString();
                break;
            case 'LinearColor':
                value = FLinearColor_1.FLinearColor.read(reader);
                break;
            case 'Vector2D':
                value = (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) ? vec2_1.vec2.Parse(reader) : vec2_1.vec2.ParseF(reader);
                break;
            case 'Vector':
            case 'Rotator':
                value = (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) ? vec3_1.vec3.Parse(reader) : vec3_1.vec3.ParseF(reader);
                break;
            case 'Quat':
            case 'Vector4':
            case 'Vector4D':
                value = (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) ? vec4_1.vec4.Parse(reader) : vec4_1.vec4.ParseF(reader);
                break;
            case 'Box':
                value = ((reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) ? {
                    min: vec3_1.vec3.Parse(reader),
                    max: vec3_1.vec3.Parse(reader),
                    isValid: reader.readByte() >= 1
                } : {
                    min: vec3_1.vec3.ParseF(reader),
                    max: vec3_1.vec3.ParseF(reader),
                    isValid: reader.readByte() >= 1
                });
                break;
            case 'RailroadTrackPosition':
                value = {
                    root: reader.readString(),
                    instanceName: reader.readString(),
                    offset: reader.readFloat32(),
                    forward: reader.readFloat32()
                };
                break;
            case 'TimerHandle':
                value = reader.readString();
                break;
            case 'Guid':
                value = GUID_1.GUID.read(reader);
                break;
            case 'ClientIdentityInfo':
                value = FClientIdentityInfo_1.FClientIdentityInfo.read(reader);
                break;
            case 'InventoryItem':
                value = FInventoryItem_1.FInventoryItem.read(reader);
                break;
            case 'FluidBox':
                value = {
                    value: reader.readFloat32()
                };
                break;
            case 'SlateBrush':
                value = reader.readString();
                break;
            case 'DateTime':
                value = reader.readInt64().toString();
                break;
            case 'UniqueNetIdRepl':
                value = FUniqueNetIdRepl_1.FUniqueNetIdRepl.read(reader, size);
                break;
            case 'PlayerInfoHandle':
                value = FPlayerInfoHandle_1.FPlayerInfoHandle.read(reader);
                break;
            case 'FICFrameRange':
                value = FICFrameRange_1.FICFrameRange.read(reader);
                break;
            case 'LBBalancerIndexing':
                value = FLBBalancerIndexing_1.FLBBalancerIndexing.read(reader);
                break;
            case 'FINNetworkTrace':
            case 'FIRTrace':
                value = FINNetworkTrace_1.FINNetworkTrace.read(reader);
                break;
            case 'FINGPUT1BufferPixel':
                value = FINGPUT1BufferPixel_1.FINGPUT1BufferPixel.read(reader);
                break;
            case 'FIRInstancedStruct':
                value = FINDynamicStructHolder_1.FINDynamicStructHolder.read(reader, size);
                break;
            case 'FINLuaProcessorStateStorage':
            case 'FINLuaRuntimePersistenceState':
                value = FINLuaRuntimePersistenceState_1.FINLuaRuntimePersistenceState.read(reader, size);
                break;
            default:
                value = DynamicStructPropertyValue_1.DynamicStructPropertyValue.read(reader, propertyTagType.name);
                break;
        }
        return value;
    }
    StructProperty.ParseValue = ParseValue;
    function Serialize(writer, property) {
        StructProperty.SerializeValue(writer, property.propertyTagType.children[0].name, property.value);
    }
    StructProperty.Serialize = Serialize;
    function SerializeValue(writer, subtype, value) {
        switch (subtype) {
            case 'Color':
                FColor_1.FColor.write(writer, value);
                break;
            case 'IntPoint':
                writer.writeInt64(BigInt(value));
                break;
            case 'LinearColor':
                FLinearColor_1.FLinearColor.write(writer, value);
                break;
            case 'Vector2D':
                value = value;
                if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) {
                    vec2_1.vec2.Serialize(writer, value);
                }
                else {
                    vec2_1.vec2.SerializeF(writer, value);
                }
                break;
            case 'Vector':
            case 'Rotator':
                value = value;
                if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) {
                    vec3_1.vec3.Serialize(writer, value);
                }
                else {
                    vec3_1.vec3.SerializeF(writer, value);
                }
                break;
            case 'Quat':
            case 'Vector4':
            case 'Vector4D':
                value = value;
                if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) {
                    vec4_1.vec4.Serialize(writer, value);
                }
                else {
                    vec4_1.vec4.SerializeF(writer, value);
                }
                break;
            case 'Box':
                value = value;
                if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SwitchTo64BitSaveArchive) {
                    vec3_1.vec3.Serialize(writer, value.min);
                    vec3_1.vec3.Serialize(writer, value.max);
                }
                else {
                    vec3_1.vec3.SerializeF(writer, value.min);
                    vec3_1.vec3.SerializeF(writer, value.max);
                }
                writer.writeByte(value.isValid ? 1 : 0);
                break;
            case 'RailroadTrackPosition':
                value = value;
                writer.writeString(value.root);
                writer.writeString(value.instanceName);
                writer.writeFloat32(value.offset);
                writer.writeFloat32(value.forward);
                break;
            case 'TimerHandle':
                value = value;
                writer.writeString(value);
                break;
            case 'Guid':
                GUID_1.GUID.write(writer, value);
                break;
            case 'ClientIdentityInfo':
                FClientIdentityInfo_1.FClientIdentityInfo.write(writer, value);
                break;
            case 'InventoryItem':
                FInventoryItem_1.FInventoryItem.write(writer, value);
                break;
            case 'FluidBox':
                value = value;
                writer.writeFloat32(value.value);
                break;
            case 'SlateBrush':
                writer.writeString(value);
                break;
            case 'DateTime':
                value = value;
                writer.writeInt64(BigInt(value));
                break;
            case 'UniqueNetIdRepl':
                FUniqueNetIdRepl_1.FUniqueNetIdRepl.write(writer, value);
                break;
            case 'PlayerInfoHandle':
                FPlayerInfoHandle_1.FPlayerInfoHandle.write(writer, value);
                break;
            case 'FICFrameRange':
                FICFrameRange_1.FICFrameRange.write(writer, value);
                break;
            case 'LBBalancerIndexing':
                FLBBalancerIndexing_1.FLBBalancerIndexing.write(writer, value);
                break;
            case 'FINNetworkTrace':
            case 'FIRTrace':
                FINNetworkTrace_1.FINNetworkTrace.write(writer, value);
                break;
            case 'FINGPUT1BufferPixel':
                FINGPUT1BufferPixel_1.FINGPUT1BufferPixel.write(writer, value);
                break;
            case 'FIRInstancedStruct':
                FINDynamicStructHolder_1.FINDynamicStructHolder.write(writer, value);
                break;
            case 'FINLuaProcessorStateStorage':
            case 'FINLuaRuntimePersistenceState':
                FINLuaRuntimePersistenceState_1.FINLuaRuntimePersistenceState.write(writer, value);
                break;
            default:
                DynamicStructPropertyValue_1.DynamicStructPropertyValue.write(writer, value);
                break;
        }
    }
    StructProperty.SerializeValue = SerializeValue;
})(StructProperty || (exports.StructProperty = StructProperty = {}));
//# sourceMappingURL=StructProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FClientIdentityInfo = void 0;
var FClientIdentityInfo;
(function (FClientIdentityInfo) {
    FClientIdentityInfo.read = (reader) => {
        const offlineId = reader.readString();
        const numAccountIds = reader.readInt32();
        const accountIds = {};
        for (let i = 0; i < numAccountIds; i++) {
            const platformFlagMaybe = reader.readByte();
            const idSize = reader.readInt32();
            const accountId = Array.from(reader.readBytes(idSize));
            accountIds[platformFlagMaybe] = accountId;
        }
        return {
            offlineId,
            accountIds
        };
    };
    FClientIdentityInfo.write = (writer, value) => {
        writer.writeString(value.offlineId);
        writer.writeInt32(Object.values(value.accountIds).length);
        for (const [platformFlagMaybe, accountId] of Object.entries(value.accountIds)) {
            writer.writeByte(Number(platformFlagMaybe));
            writer.writeInt32(accountId.length);
            writer.writeBytesArray(accountId);
        }
    };
})(FClientIdentityInfo || (exports.FClientIdentityInfo = FClientIdentityInfo = {}));
//# sourceMappingURL=FClientIdentityInfo.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FColor = void 0;
const col4_1 = __r(9);
var FColor;
(function (FColor) {
    FColor.read = (reader) => {
        return col4_1.col4.ParseBGRA(reader);
    };
    FColor.write = (writer, value) => {
        col4_1.col4.SerializeBGRA(writer, value);
    };
})(FColor || (exports.FColor = FColor = {}));
//# sourceMappingURL=FColor.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FInventoryItem = void 0;
const save_custom_version_1 = __r(8);
const FGDynamicStruct_1 = __r(69);
const ObjectReference_1 = __r(17);
var FInventoryItem;
(function (FInventoryItem) {
    function read(reader) {
        let value = {
            itemReference: ObjectReference_1.ObjectReference.read(reader)
        };
        if (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.RefactoredInventoryItemState) {
            value.itemState = FGDynamicStruct_1.FGDynamicStruct.Parse(reader);
        }
        else {
            value.legacyItemStateActor = ObjectReference_1.ObjectReference.read(reader);
        }
        return value;
    }
    FInventoryItem.read = read;
    function write(writer, value) {
        ObjectReference_1.ObjectReference.write(writer, value.itemReference);
        if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.RefactoredInventoryItemState) {
            FGDynamicStruct_1.FGDynamicStruct.Serialize(writer, value.itemState);
        }
        else {
            ObjectReference_1.ObjectReference.write(writer, value.legacyItemStateActor);
        }
    }
    FInventoryItem.write = write;
})(FInventoryItem || (exports.FInventoryItem = FInventoryItem = {}));
;
//# sourceMappingURL=FInventoryItem.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FGDynamicStruct = void 0;
const PropertiesList_1 = __r(45);
const FINItemStateFileSystem_1 = __r(70);
const ObjectReference_1 = __r(17);
var FGDynamicStruct;
(function (FGDynamicStruct) {
    FGDynamicStruct.Parse = (reader) => {
        const struct = {
            hasValidStruct: reader.readInt32() >= 1
        };
        if (struct.hasValidStruct) {
            struct.structReference = ObjectReference_1.ObjectReference.read(reader);
            const savedPayloadSize = reader.readInt32();
            if (reader.context.mods.FicsItNetworks !== undefined && FINItemStateFileSystem_1.FINItemStateFileSystem.IsFINItemStateFileSystem(struct)) {
                struct.rawBytes = FINItemStateFileSystem_1.FINItemStateFileSystem.read(reader, savedPayloadSize);
            }
            else {
                struct.properties = PropertiesList_1.PropertiesList.ParseList(reader);
            }
        }
        return struct;
    };
    FGDynamicStruct.Serialize = (writer, struct) => {
        writer.writeInt32(struct.hasValidStruct ? 1 : 0);
        if (struct.hasValidStruct) {
            ObjectReference_1.ObjectReference.write(writer, struct.structReference);
            const before = writer.getBufferPosition();
            writer.writeInt32Zero();
            if (FINItemStateFileSystem_1.FINItemStateFileSystem.IsFINItemStateFileSystem(struct)) {
                FINItemStateFileSystem_1.FINItemStateFileSystem.write(writer, struct.rawBytes);
            }
            else {
                PropertiesList_1.PropertiesList.SerializeList(writer, struct.properties);
            }
            writer.writeBinarySizeFromPosition(before, before + 4);
        }
    };
})(FGDynamicStruct || (exports.FGDynamicStruct = FGDynamicStruct = {}));
//# sourceMappingURL=FGDynamicStruct.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINItemStateFileSystem = void 0;
const ObjectReference_1 = __r(17);
var FINItemStateFileSystem;
(function (FINItemStateFileSystem) {
    FINItemStateFileSystem.ExactStructReference = {
        levelName: '',
        pathName: '/Script/FicsItNetworksComputer.FINItemStateFileSystem'
    };
    FINItemStateFileSystem.IsFINItemStateFileSystem = (struct) => {
        return ObjectReference_1.ObjectReference.IsEqual(struct.structReference, FINItemStateFileSystem.ExactStructReference);
    };
    FINItemStateFileSystem.read = (reader, numBytes) => {
        return Array.from(reader.readBytes(numBytes));
    };
    FINItemStateFileSystem.write = (writer, rawBytes) => {
        writer.writeBytesArray(rawBytes);
    };
})(FINItemStateFileSystem || (exports.FINItemStateFileSystem = FINItemStateFileSystem = {}));
//# sourceMappingURL=FINItemStateFileSystem.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLinearColor = void 0;
const col4_1 = __r(9);
var FLinearColor;
(function (FLinearColor) {
    FLinearColor.read = (reader) => {
        return col4_1.col4.ParseRGBA(reader);
    };
    FLinearColor.write = (writer, value) => {
        col4_1.col4.SerializeRGBA(writer, value);
    };
})(FLinearColor || (exports.FLinearColor = FLinearColor = {}));
//# sourceMappingURL=FLinearColor.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUniqueNetIdRepl = void 0;
var FUniqueNetIdRepl;
(function (FUniqueNetIdRepl) {
    function read(reader, size) {
        const flags = 0;
        const rawData = Array.from(reader.readBytes(size));
        return {
            flags,
            rawData
        };
    }
    FUniqueNetIdRepl.read = read;
    function write(writer, replId) {
        writer.writeBytes(new Uint8Array(replId.rawData));
    }
    FUniqueNetIdRepl.write = write;
})(FUniqueNetIdRepl || (exports.FUniqueNetIdRepl = FUniqueNetIdRepl = {}));
;
//# sourceMappingURL=FUniqueNetIdRepl.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicStructPropertyValue = void 0;
const PropertiesList_1 = __r(45);
var DynamicStructPropertyValue;
(function (DynamicStructPropertyValue) {
    DynamicStructPropertyValue.read = (reader, type) => {
        const data = {
            type, properties: {}
        };
        data.properties = PropertiesList_1.PropertiesList.ParseList(reader);
        return data;
    };
    DynamicStructPropertyValue.write = (writer, data) => {
        PropertiesList_1.PropertiesList.SerializeList(writer, data.properties);
    };
})(DynamicStructPropertyValue || (exports.DynamicStructPropertyValue = DynamicStructPropertyValue = {}));
;
//# sourceMappingURL=DynamicStructPropertyValue.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FICFrameRange = void 0;
var FICFrameRange;
(function (FICFrameRange) {
    FICFrameRange.read = (reader) => {
        return {
            begin: reader.readInt64().toString(),
            end: reader.readInt64().toString(),
        };
    };
    FICFrameRange.write = (writer, value) => {
        writer.writeInt64(BigInt(value.begin));
        writer.writeInt64(BigInt(value.end));
    };
})(FICFrameRange || (exports.FICFrameRange = FICFrameRange = {}));
//# sourceMappingURL=FICFrameRange.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINDynamicStructHolder = void 0;
const PropertiesList_1 = __r(45);
var FINDynamicStructHolder;
(function (FINDynamicStructHolder) {
    FINDynamicStructHolder.read = (reader, size) => {
        const structHolder = {
            unk0: reader.readInt32(),
            subtype: reader.readString(),
            properties: {},
            remainingBytes: []
        };
        if (structHolder.subtype.length === 0) {
            return structHolder;
        }
        switch (structHolder.subtype) {
            case '/Script/FicsItNetworks.FINGPUT2DC_Box':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Box':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Text':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_PushClipRect':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_PopClip':
            case '/Script/FicsItNetworksLua.FINEventFilter':
            case '/Script/FactoryGame.PrefabSignData':
                structHolder.properties = PropertiesList_1.PropertiesList.ParseList(reader);
                break;
            case '/Script/FicsItNetworks.FINGPUT2DC_Lines':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Lines':
                structHolder.remainingBytes = Array.from(reader.readBytes(size));
                break;
            default:
                structHolder.remainingBytes = Array.from(reader.readBytes(size));
                break;
        }
        return structHolder;
    };
    FINDynamicStructHolder.write = (writer, structHolder) => {
        writer.writeInt32(structHolder.unk0);
        writer.writeString(structHolder.subtype);
        if (structHolder.subtype.length === 0) {
            return;
        }
        switch (structHolder.subtype) {
            case '/Script/FicsItNetworks.FINGPUT2DC_Box':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Box':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Text':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_PushClipRect':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_PopClip':
            case '/Script/FicsItNetworksLua.FINEventFilter':
            case '/Script/FactoryGame.PrefabSignData':
                PropertiesList_1.PropertiesList.SerializeList(writer, structHolder.properties);
                break;
            case '/Script/FicsItNetworks.FINGPUT2DC_Lines':
            case '/Script/FicsItNetworksComputer.FINGPUT2DC_Lines':
                writer.writeBytes(new Uint8Array(structHolder.remainingBytes));
                break;
            default:
                writer.writeBytes(new Uint8Array(structHolder.remainingBytes));
                break;
        }
    };
})(FINDynamicStructHolder || (exports.FINDynamicStructHolder = FINDynamicStructHolder = {}));
//# sourceMappingURL=FINDynamicStructHolder.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINGPUT1BufferPixel = void 0;
const col4_1 = __r(9);
var FINGPUT1BufferPixel;
(function (FINGPUT1BufferPixel) {
    FINGPUT1BufferPixel.read = (reader) => {
        const bufferpixel = {
            character: reader.readHex(2),
            foreGroundColor: col4_1.col4.ParseRGBA(reader),
            backgroundColor: col4_1.col4.ParseRGBA(reader)
        };
        return bufferpixel;
    };
    FINGPUT1BufferPixel.write = (writer, bufferpixel) => {
        writer.writeHex(bufferpixel.character);
        col4_1.col4.SerializeRGBA(writer, bufferpixel.foreGroundColor);
        col4_1.col4.SerializeRGBA(writer, bufferpixel.backgroundColor);
    };
})(FINGPUT1BufferPixel || (exports.FINGPUT1BufferPixel = FINGPUT1BufferPixel = {}));
//# sourceMappingURL=FINGPUT1BufferPixel.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINLuaRuntimePersistenceState = void 0;
const object_references_list_1 = __r(78);
const FINNetworkTrace_1 = __r(79);
var FINLuaRuntimePersistenceState;
(function (FINLuaRuntimePersistenceState) {
    FINLuaRuntimePersistenceState.read = (reader, size) => {
        const start = reader.getBufferPosition();
        const state = {
            traces: [],
            references: [],
            thread: '',
            globals: '',
            structs: [],
            remainingRawData: []
        };
        const countTraces = reader.readInt32();
        for (let i = 0; i < countTraces; i++) {
            state.traces.push(FINNetworkTrace_1.FINNetworkTrace.read(reader));
        }
        state.references = object_references_list_1.ObjectReferencesList.ReadList(reader);
        state.thread = reader.readString();
        state.globals = reader.readString();
        const remainingSize = size - (reader.getBufferPosition() - start);
        state.remainingRawData = Array.from(reader.readBytes(remainingSize));
        return state;
    };
    FINLuaRuntimePersistenceState.write = (writer, state) => {
        writer.writeInt32(state.traces.length);
        for (const trace of state.traces) {
            FINNetworkTrace_1.FINNetworkTrace.write(writer, trace);
        }
        object_references_list_1.ObjectReferencesList.SerializeList(writer, state.references);
        writer.writeString(state.thread);
        writer.writeString(state.globals);
        writer.writeBytesArray(state.remainingRawData);
    };
})(FINLuaRuntimePersistenceState || (exports.FINLuaRuntimePersistenceState = FINLuaRuntimePersistenceState = {}));
//# sourceMappingURL=FINLuaRuntimePersistenceState.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectReferencesList = void 0;
const ObjectReference_1 = __r(17);
var ObjectReferencesList;
(function (ObjectReferencesList) {
    ObjectReferencesList.SerializeList = (writer, collectables) => {
        writer.writeInt32(collectables.length);
        for (const collectable of collectables) {
            ObjectReference_1.ObjectReference.write(writer, collectable);
        }
    };
    ObjectReferencesList.ReadList = (reader) => {
        const collected = [];
        let count = reader.readInt32();
        for (let i = 0; i < count; i++) {
            collected.push(ObjectReference_1.ObjectReference.read(reader));
        }
        return collected;
    };
})(ObjectReferencesList || (exports.ObjectReferencesList = ObjectReferencesList = {}));
//# sourceMappingURL=object-references-list.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINNetworkTrace = void 0;
const ObjectReference_1 = __r(17);
var FINNetworkTrace;
(function (FINNetworkTrace) {
    FINNetworkTrace.read = (reader) => {
        const firTrace = {
            reference: ObjectReference_1.ObjectReference.read(reader)
        };
        const hasPrevious = reader.readInt32() >= 1;
        if (hasPrevious) {
            firTrace.previous = FINNetworkTrace.read(reader);
        }
        const hasStep = reader.readInt32() >= 1;
        if (hasStep) {
            firTrace.step = reader.readString();
        }
        return firTrace;
    };
    FINNetworkTrace.write = (writer, firTrace) => {
        ObjectReference_1.ObjectReference.write(writer, firTrace.reference);
        const hasPrevious = firTrace.previous !== undefined;
        writer.writeInt32(hasPrevious ? 1 : 0);
        if (hasPrevious) {
            FINNetworkTrace.write(writer, firTrace.previous);
        }
        const hasStep = firTrace.step !== undefined;
        writer.writeInt32(hasStep ? 1 : 0);
        if (hasStep) {
            writer.writeString(firTrace.step);
        }
    };
})(FINNetworkTrace || (exports.FINNetworkTrace = FINNetworkTrace = {}));
//# sourceMappingURL=FINNetworkTrace.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLBBalancerIndexing = void 0;
var FLBBalancerIndexing;
(function (FLBBalancerIndexing) {
    FLBBalancerIndexing.read = (reader) => {
        return {
            mNormalIndex: reader.readInt32(),
            mOverflowIndex: reader.readInt32(),
            mFilterIndex: reader.readInt32(),
        };
    };
    FLBBalancerIndexing.write = (writer, value) => {
        writer.writeInt32(value.mNormalIndex);
        writer.writeInt32(value.mOverflowIndex);
        writer.writeInt32(value.mFilterIndex);
    };
})(FLBBalancerIndexing || (exports.FLBBalancerIndexing = FLBBalancerIndexing = {}));
;
//# sourceMappingURL=FLBBalancerIndexing.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec4 = void 0;
const vec3_1 = __r(18);
var vec4;
(function (vec4) {
    vec4.Parse = (reader) => {
        return {
            ...(vec3_1.vec3.Parse(reader)),
            w: reader.readDouble()
        };
    };
    vec4.Serialize = (writer, vec) => {
        vec3_1.vec3.Serialize(writer, vec);
        writer.writeDouble(vec.w);
    };
    vec4.ParseF = (reader) => {
        return {
            ...(vec3_1.vec3.ParseF(reader)),
            w: reader.readFloat32()
        };
    };
    vec4.SerializeF = (writer, vec) => {
        vec3_1.vec3.SerializeF(writer, vec);
        writer.writeFloat32(vec.w);
    };
})(vec4 || (exports.vec4 = vec4 = {}));
//# sourceMappingURL=vec4.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapProperty = exports.isMapProperty = void 0;
const parser_error_1 = __r(3);
const LBBalancerIndexing_1 = __r(83);
const DynamicStructPropertyValue_1 = __r(73);
const vec3_1 = __r(18);
const ByteProperty_1 = __r(51);
const EnumProperty_1 = __r(54);
const Int64Property_1 = __r(56);
const IntProperty_1 = __r(58);
const ObjectProperty_1 = __r(59);
const StrProperty_1 = __r(62);
const isMapProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'MapProperty';
exports.isMapProperty = isMapProperty;
var MapProperty;
(function (MapProperty) {
    function Parse(reader, property) {
        const start = reader.getBufferPosition();
        const keyType = property.propertyTagType.children[0].name;
        const valueType = property.propertyTagType.children[1].name;
        property.numElementsToRemove = reader.readInt32();
        if (property.numElementsToRemove > 0) {
            throw new parser_error_1.UnimplementedError('MapProperty does not yet support Number of Elements to be removed. Feel free to raise an issue.');
        }
        property.values = [];
        const elementCount = reader.readInt32();
        for (let i = 0; i < elementCount; i++) {
            let key;
            let value;
            switch (keyType) {
                case 'StructProperty':
                    if (property.name === 'mSaveData' || property.name === 'mUnresolvedSaveData') {
                        key = vec3_1.vec3.ParseInt(reader);
                    }
                    else {
                        key = DynamicStructPropertyValue_1.DynamicStructPropertyValue.read(reader, keyType);
                    }
                    break;
                case 'ObjectProperty':
                    key = ObjectProperty_1.ObjectProperty.ReadValue(reader);
                    break;
                case 'StrProperty':
                case 'NameProperty':
                    key = StrProperty_1.StrProperty.ReadValue(reader);
                    break;
                case 'EnumProperty':
                    key = EnumProperty_1.EnumProperty.ReadValue(reader);
                    break;
                case 'IntProperty':
                    key = IntProperty_1.IntProperty.ReadValue(reader);
                    break;
                case 'Int64Property':
                    key = Int64Property_1.Int64Property.ReadValue(reader);
                    break;
                case 'ByteProperty':
                    key = ByteProperty_1.ByteProperty.ReadValue(reader);
                    break;
                default:
                    throw new Error(`not implemented map key type ${keyType}`);
            }
            switch (valueType) {
                case 'StructProperty':
                    if (property.name === 'mIndexMapping' && reader.context.mods.MLBAlternates !== undefined) {
                        value = LBBalancerIndexing_1.LBBalancerIndexing.read(reader);
                    }
                    else if (property.name === 'Senders' && reader.context.mods.FicsItNetworks !== undefined) {
                        value = DynamicStructPropertyValue_1.DynamicStructPropertyValue.read(reader, valueType);
                    }
                    else {
                        value = DynamicStructPropertyValue_1.DynamicStructPropertyValue.read(reader, valueType);
                    }
                    break;
                case 'ObjectProperty':
                    value = ObjectProperty_1.ObjectProperty.ReadValue(reader);
                    break;
                case 'StrProperty':
                case 'NameProperty':
                    value = StrProperty_1.StrProperty.ReadValue(reader);
                    break;
                case 'EnumProperty':
                    value = EnumProperty_1.EnumProperty.ReadValue(reader);
                    break;
                case 'IntProperty':
                    value = IntProperty_1.IntProperty.ReadValue(reader);
                    break;
                case 'Int64Property':
                    value = Int64Property_1.Int64Property.ReadValue(reader);
                    break;
                case 'ByteProperty':
                    value = ByteProperty_1.ByteProperty.ReadValue(reader);
                    break;
                default:
                    throw new Error(`not implemented map value type ${valueType}`);
            }
            property.values.push([key, value]);
        }
    }
    MapProperty.Parse = Parse;
    function Serialize(writer, property) {
        const keyType = property.propertyTagType.children[0].name;
        const valueType = property.propertyTagType.children[1].name;
        writer.writeInt32(property.numElementsToRemove ?? 0);
        writer.writeInt32(property.values.length);
        for (const entry of property.values) {
            switch (keyType) {
                case 'StructProperty':
                    if (property.name === 'mSaveData' || property.name === 'mUnresolvedSaveData') {
                        vec3_1.vec3.SerializeInt(writer, entry[0]);
                    }
                    else {
                        DynamicStructPropertyValue_1.DynamicStructPropertyValue.write(writer, entry[0]);
                    }
                    break;
                case 'ObjectProperty':
                    ObjectProperty_1.ObjectProperty.SerializeValue(writer, entry[0]);
                    break;
                case 'StrProperty':
                case 'NameProperty':
                    StrProperty_1.StrProperty.SerializeValue(writer, entry[0]);
                    break;
                case 'EnumProperty':
                    EnumProperty_1.EnumProperty.SerializeValue(writer, entry[0]);
                    break;
                case 'IntProperty':
                    IntProperty_1.IntProperty.SerializeValue(writer, entry[0]);
                    break;
                case 'Int64Property':
                    Int64Property_1.Int64Property.SerializeValue(writer, entry[0]);
                    break;
                case 'ByteProperty':
                    ByteProperty_1.ByteProperty.SerializeValue(writer, entry[0]);
                    break;
                default:
                    throw new Error(`not implemented map key type ${valueType}`);
            }
            switch (valueType) {
                case 'StructProperty':
                    if (property.name === 'mIndexMapping' && writer.context.mods.MLBAlternates !== undefined) {
                        LBBalancerIndexing_1.LBBalancerIndexing.write(writer, entry[1]);
                    }
                    else if (property.name === 'Senders' && writer.context.mods.FicsItNetworks !== undefined) {
                        DynamicStructPropertyValue_1.DynamicStructPropertyValue.write(writer, entry[1]);
                    }
                    else {
                        DynamicStructPropertyValue_1.DynamicStructPropertyValue.write(writer, entry[1]);
                    }
                    break;
                case 'ObjectProperty':
                    ObjectProperty_1.ObjectProperty.SerializeValue(writer, entry[1]);
                    break;
                case 'StrProperty':
                case 'NameProperty':
                    StrProperty_1.StrProperty.SerializeValue(writer, entry[1]);
                    break;
                case 'EnumProperty':
                    EnumProperty_1.EnumProperty.SerializeValue(writer, entry[1]);
                    break;
                case 'IntProperty':
                    IntProperty_1.IntProperty.SerializeValue(writer, entry[1]);
                    break;
                case 'Int64Property':
                    Int64Property_1.Int64Property.SerializeValue(writer, entry[1]);
                    break;
                case 'ByteProperty':
                    ByteProperty_1.ByteProperty.SerializeValue(writer, entry[1]);
                    break;
                default:
                    throw new Error(`not implemented map value type ${valueType}`);
            }
        }
    }
    MapProperty.Serialize = Serialize;
})(MapProperty || (exports.MapProperty = MapProperty = {}));
//# sourceMappingURL=MapProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LBBalancerIndexing = void 0;
var LBBalancerIndexing;
(function (LBBalancerIndexing) {
    function read(reader) {
        return {
            mNormalIndex: reader.readInt32(),
            mOverflowIndex: reader.readInt32(),
            mFilterIndex: reader.readInt32()
        };
    }
    LBBalancerIndexing.read = read;
    function write(writer, handle) {
        writer.writeInt32(handle.mNormalIndex);
        writer.writeInt32(handle.mOverflowIndex);
        writer.writeInt32(handle.mFilterIndex);
    }
    LBBalancerIndexing.write = write;
})(LBBalancerIndexing || (exports.LBBalancerIndexing = LBBalancerIndexing = {}));
;
//# sourceMappingURL=LBBalancerIndexing.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetProperty = exports.isSetProperty = void 0;
const parser_error_1 = __r(3);
const GUID_1 = __r(14);
const vec3_1 = __r(18);
const IntProperty_1 = __r(58);
const NameProperty_1 = __r(85);
const ObjectProperty_1 = __r(59);
const StrProperty_1 = __r(62);
const Uint32Property_1 = __r(86);
const isSetProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'SetProperty';
exports.isSetProperty = isSetProperty;
var SetProperty;
(function (SetProperty) {
    function Parse(reader, property) {
        property.numElementsToRemove = reader.readInt32();
        if (property.numElementsToRemove > 0) {
            throw new parser_error_1.UnimplementedError('SetProperty does not yet support Number of Elements to be removed. Feel free to raise an issue.');
        }
        const elementCount = reader.readInt32();
        switch (property.propertyTagType.children[0].name) {
            case "UInt32Property":
                property.values = new Array(elementCount).fill(0).map(() => Uint32Property_1.Uint32Property.ReadValue(reader));
                break;
            case "IntProperty":
                property.values = new Array(elementCount).fill(0).map(() => IntProperty_1.IntProperty.ReadValue(reader));
                break;
            case "ObjectProperty":
                property.values = new Array(elementCount).fill(0).map(() => ObjectProperty_1.ObjectProperty.ReadValue(reader));
                break;
            case "NameProperty":
                property.values = new Array(elementCount).fill(0).map(() => NameProperty_1.NameProperty.ReadValue(reader));
                break;
            case "StrProperty":
                property.values = new Array(elementCount).fill(0).map(() => StrProperty_1.StrProperty.ReadValue(reader));
                break;
            case "StructProperty":
                if (property.name === 'mRemovalLocations') {
                    property.values = new Array(elementCount).fill(0).map(() => vec3_1.vec3.ParseF(reader));
                }
                else if (property.name === 'mDestroyedPickups' || property.name === 'mLootedDropPods') {
                    property.values = new Array(elementCount).fill(0).map(() => GUID_1.GUID.read(reader));
                }
                else {
                    throw new parser_error_1.UnimplementedError(`Not Implemented SetProperty of StructProperty for property type ${property.name}.`);
                }
                break;
            default:
                throw new Error(`Not Implemented SetProperty of ${property.propertyTagType.children[0].name}.`);
        }
    }
    SetProperty.Parse = Parse;
    function Serialize(writer, property) {
        writer.writeInt32(property.numElementsToRemove ?? 0);
        writer.writeInt32(property.values.length);
        switch (property.propertyTagType.children[0].name) {
            case "UInt32Property":
                property.values.forEach(value => Uint32Property_1.Uint32Property.SerializeValue(writer, value));
                break;
            case "IntProperty":
                property.values.forEach(value => IntProperty_1.IntProperty.SerializeValue(writer, value));
                break;
            case "ObjectProperty":
                property.values.forEach(value => ObjectProperty_1.ObjectProperty.SerializeValue(writer, value));
                break;
            case "NameProperty":
                property.values.forEach(value => NameProperty_1.NameProperty.SerializeValue(writer, value));
                break;
            case "StrProperty":
                property.values.forEach(value => StrProperty_1.StrProperty.SerializeValue(writer, value));
                break;
            case "StructProperty":
                if (property.name === 'mRemovalLocations') {
                    property.values.forEach(v => vec3_1.vec3.SerializeF(writer, v));
                }
                else if (property.name === 'mDestroyedPickups' || property.name === 'mLootedDropPods') {
                    property.values.forEach(v => GUID_1.GUID.write(writer, v));
                }
                else {
                    throw new Error(`Not Implemented serializing SetProperty of StructProperty for property ${property.name}.`);
                }
                break;
            default:
                throw new Error(`Not Implemented SetProperty of ${property.propertyTagType.children[0].name}.`);
        }
    }
    SetProperty.Serialize = Serialize;
})(SetProperty || (exports.SetProperty = SetProperty = {}));
//# sourceMappingURL=SetProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameProperty = exports.isNameProperty = void 0;
const isNameProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'NameProperty';
exports.isNameProperty = isNameProperty;
var NameProperty;
(function (NameProperty) {
    function Parse(reader, currentProperty) {
        currentProperty.value = ReadValue(reader);
    }
    NameProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readString();
    }
    NameProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    NameProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeString(value);
    }
    NameProperty.SerializeValue = SerializeValue;
})(NameProperty || (exports.NameProperty = NameProperty = {}));
//# sourceMappingURL=NameProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint32Property = exports.isUint32Property = void 0;
const isUint32Property = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'UInt32Property';
exports.isUint32Property = isUint32Property;
var Uint32Property;
(function (Uint32Property) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    Uint32Property.Parse = Parse;
    function ReadValue(reader) {
        return reader.readUint32();
    }
    Uint32Property.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    Uint32Property.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeUint32(value);
    }
    Uint32Property.SerializeValue = SerializeValue;
})(Uint32Property || (exports.Uint32Property = Uint32Property = {}));
//# sourceMappingURL=Uint32Property.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Int8Property = exports.isInt8Property = void 0;
const isInt8Property = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'Int8Property';
exports.isInt8Property = isInt8Property;
var Int8Property;
(function (Int8Property) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    Int8Property.Parse = Parse;
    function ReadValue(reader) {
        return reader.readInt8();
    }
    Int8Property.ReadValue = ReadValue;
    function Serialize(writer, property) {
        Int8Property.SerializeValue(writer, property.value);
    }
    Int8Property.Serialize = Serialize;
    Int8Property.SerializeValue = (writer, value) => {
        writer.writeInt8(value);
    };
})(Int8Property || (exports.Int8Property = Int8Property = {}));
//# sourceMappingURL=Int8Property.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleProperty = exports.isSingleProperty = void 0;
const isSingleProperty = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'SingleProperty';
exports.isSingleProperty = isSingleProperty;
var SingleProperty;
(function (SingleProperty) {
    function Parse(reader, property) {
        property.value = ReadValue(reader);
    }
    SingleProperty.Parse = Parse;
    function ReadValue(reader) {
        return reader.readFloat32();
    }
    SingleProperty.ReadValue = ReadValue;
    function Serialize(writer, property) {
        SerializeValue(writer, property.value);
    }
    SingleProperty.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeFloat32(value);
    }
    SingleProperty.SerializeValue = SerializeValue;
})(SingleProperty || (exports.SingleProperty = SingleProperty = {}));
//# sourceMappingURL=SingleProperty.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint64Property = exports.isUInt64Property = void 0;
const isUInt64Property = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'UInt64Property';
exports.isUInt64Property = isUInt64Property;
var Uint64Property;
(function (Uint64Property) {
    function Parse(reader, property) {
        property.value = Uint64Property.ReadValue(reader);
    }
    Uint64Property.Parse = Parse;
    function ReadValue(reader) {
        return reader.readUint64().toString();
    }
    Uint64Property.ReadValue = ReadValue;
    function Serialize(writer, property) {
        Uint64Property.SerializeValue(writer, property.value);
    }
    Uint64Property.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeUint64(BigInt(value));
    }
    Uint64Property.SerializeValue = SerializeValue;
})(Uint64Property || (exports.Uint64Property = Uint64Property = {}));
//# sourceMappingURL=Uint64Property.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8Property = exports.isUint8Property = void 0;
const isUint8Property = (property) => property !== null && !Array.isArray(property) && property.propertyTagType?.name === 'UInt8Property';
exports.isUint8Property = isUint8Property;
var Uint8Property;
(function (Uint8Property) {
    function Parse(reader, property) {
        property.value = Uint8Property.ReadValue(reader);
    }
    Uint8Property.Parse = Parse;
    function ReadValue(reader) {
        return reader.readUint8();
    }
    Uint8Property.ReadValue = ReadValue;
    function Serialize(writer, property) {
        Uint8Property.SerializeValue(writer, property.value);
    }
    Uint8Property.Serialize = Serialize;
    function SerializeValue(writer, value) {
        writer.writeUint8(value);
    }
    Uint8Property.SerializeValue = SerializeValue;
})(Uint8Property || (exports.Uint8Property = Uint8Property = {}));
//# sourceMappingURL=Uint8Property.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialProperties = void 0;
const BuildableSubsystemSpecialProperties_1 = __r(92);
const CircuitSpecialProperties_1 = __r(95);
const ConveyorChainActorSpecialProperties_1 = __r(96);
const ConveyorSpecialProperties_1 = __r(99);
const EmptySpecialProperties_1 = __r(100);
const ObjectsListSpecialProperties_1 = __r(101);
const PlayerSpecialProperties_1 = __r(102);
const PowerLineSpecialProperties_1 = __r(103);
const SpecialDroneActionProperties_1 = __r(104);
const VehicleSpecialProperties_1 = __r(105);
var SpecialProperties;
(function (SpecialProperties) {
    SpecialProperties.ParseClassSpecificSpecialProperties = (reader, typePath, remainingLen) => {
        let property;
        switch (typePath) {
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1.Build_ConveyorBeltMk1_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk2/Build_ConveyorBeltMk2.Build_ConveyorBeltMk2_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk3/Build_ConveyorBeltMk3.Build_ConveyorBeltMk3_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk4/Build_ConveyorBeltMk4.Build_ConveyorBeltMk4_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk5/Build_ConveyorBeltMk5.Build_ConveyorBeltMk5_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk6/Build_ConveyorBeltMk6.Build_ConveyorBeltMk6_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk1/Build_ConveyorLiftMk1.Build_ConveyorLiftMk1_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk2/Build_ConveyorLiftMk2.Build_ConveyorLiftMk2_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk3/Build_ConveyorLiftMk3.Build_ConveyorLiftMk3_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk4/Build_ConveyorLiftMk4.Build_ConveyorLiftMk4_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk5/Build_ConveyorLiftMk5.Build_ConveyorLiftMk5_C':
            case '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk6/Build_ConveyorLiftMk6.Build_ConveyorLiftMk6_C':
                property = ConveyorSpecialProperties_1.ConveyorSpecialProperties.Parse(reader);
                break;
            case '/Game/FactoryGame/-Shared/Blueprint/BP_CircuitSubsystem.BP_CircuitSubsystem_C':
                property = CircuitSpecialProperties_1.CircuitSpecialProperties.Parse(reader);
                break;
            case '/Game/FactoryGame/-Shared/Blueprint/BP_GameState.BP_GameState_C':
            case '/Game/FactoryGame/-Shared/Blueprint/BP_GameMode.BP_GameMode_C':
                property = ObjectsListSpecialProperties_1.ObjectsListSpecialProperties.Parse(reader);
                break;
            case '/Script/FactoryGame.FGConveyorChainActor':
            case '/Script/FactoryGame.FGConveyorChainActor_RepSizeMedium':
            case '/Script/FactoryGame.FGConveyorChainActor_RepSizeLarge':
            case '/Script/FactoryGame.FGConveyorChainActor_RepSizeHuge':
            case '/Script/FactoryGame.FGConveyorChainActor_RepSizeNoCull':
                property = ConveyorChainActorSpecialProperties_1.ConveyorChainActorSpecialProperties.Parse(reader);
                break;
            case '/Game/FactoryGame/Buildable/Factory/PowerLine/Build_PowerLine.Build_PowerLine_C':
            case '/Game/FactoryGame/Events/Christmas/Buildings/PowerLineLights/Build_XmassLightsLine.Build_XmassLightsLine_C':
                property = PowerLineSpecialProperties_1.PowerLineSpecialProperties.Parse(reader, remainingLen);
                break;
            case '/Game/FactoryGame/Buildable/Vehicle/Tractor/BP_Tractor.BP_Tractor_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Truck/BP_Truck.BP_Truck_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Explorer/BP_Explorer.BP_Explorer_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Cyberwagon/Testa_BP_WB.Testa_BP_WB_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Golfcart/BP_Golfcart.BP_Golfcart_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Golfcart/BP_GolfcartGold.BP_GolfcartGold_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Train/Locomotive/BP_Locomotive.BP_Locomotive_C':
            case '/Game/FactoryGame/Buildable/Vehicle/Train/Wagon/BP_FreightWagon.BP_FreightWagon_C':
                property = VehicleSpecialProperties_1.VehicleSpecialProperties.Parse(reader, remainingLen, typePath);
                break;
            case '/Game/FactoryGame/Buildable/Factory/DroneStation/BP_DroneTransport.BP_DroneTransport_C':
                property = SpecialDroneActionProperties_1.SpecialDroneActionProperties.Parse(reader);
                break;
            case '/Game/FactoryGame/Character/Player/BP_PlayerState.BP_PlayerState_C':
                property = PlayerSpecialProperties_1.PlayerSpecialProperties.Parse(reader);
                break;
            case '/Script/FactoryGame.FGLightweightBuildableSubsystem':
                property = BuildableSubsystemSpecialProperties_1.BuildableSubsystemSpecialProperties.Parse(reader);
                break;
            default:
                property = EmptySpecialProperties_1.EmptySpecialProperties.Parse(reader);
                break;
        }
        return property;
    };
    SpecialProperties.SerializeClassSpecificSpecialProperties = (writer, typePath, property) => {
        if ((0, ConveyorSpecialProperties_1.isConveyorSpecialProperties)(property)) {
            ConveyorSpecialProperties_1.ConveyorSpecialProperties.Serialize(writer, property);
        }
        else if ((0, CircuitSpecialProperties_1.isCircuitSpecialProperties)(property)) {
            CircuitSpecialProperties_1.CircuitSpecialProperties.Serialize(writer, property);
        }
        else if ((0, ConveyorChainActorSpecialProperties_1.isConveyorChainActorSpecialProperties)(property)) {
            ConveyorChainActorSpecialProperties_1.ConveyorChainActorSpecialProperties.Serialize(writer, property);
        }
        else if ((0, PowerLineSpecialProperties_1.isPowerLineSpecialProperties)(property)) {
            PowerLineSpecialProperties_1.PowerLineSpecialProperties.Serialize(writer, property);
        }
        else if ((0, ObjectsListSpecialProperties_1.isObjectsListSpecialProperties)(property)) {
            ObjectsListSpecialProperties_1.ObjectsListSpecialProperties.Serialize(writer, property);
        }
        else if ((0, VehicleSpecialProperties_1.isVehicleSpecialProperties)(property)) {
            VehicleSpecialProperties_1.VehicleSpecialProperties.Serialize(writer, property);
        }
        else if ((0, SpecialDroneActionProperties_1.isSpecialDroneActionProperties)(property)) {
            SpecialDroneActionProperties_1.SpecialDroneActionProperties.Serialize(writer, property);
        }
        else if ((0, PlayerSpecialProperties_1.isPlayerSpecialProperties)(property)) {
            PlayerSpecialProperties_1.PlayerSpecialProperties.Serialize(writer, property);
        }
        else if ((0, BuildableSubsystemSpecialProperties_1.isBuildableSubsystemSpecialProperties)(property)) {
            BuildableSubsystemSpecialProperties_1.BuildableSubsystemSpecialProperties.Serialize(writer, property);
        }
        else if ((0, EmptySpecialProperties_1.isEmptySpecialProperties)(property)) {
            EmptySpecialProperties_1.EmptySpecialProperties.Serialize(writer, property);
        }
        else {
            console.warn(`Parser is not serializing special property ${JSON.stringify(property)} of object with type ${typePath}. Unimplemented.`);
        }
    };
})(SpecialProperties || (exports.SpecialProperties = SpecialProperties = {}));
//# sourceMappingURL=SpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildableTypeInstance = exports.BuildableSubsystemSpecialProperties = exports.isBuildableSubsystemSpecialProperties = void 0;
const save_custom_version_1 = __r(8);
const FPlayerInfoHandle_1 = __r(6);
const col4_1 = __r(9);
const FGDynamicStruct_1 = __r(69);
const ObjectReference_1 = __r(17);
const Transform_1 = __r(93);
const runtime_buildable_instance_data_version_1 = __r(94);
const isBuildableSubsystemSpecialProperties = (obj) => obj.type === 'BuildableSubsystemSpecialProperties';
exports.isBuildableSubsystemSpecialProperties = isBuildableSubsystemSpecialProperties;
var BuildableSubsystemSpecialProperties;
(function (BuildableSubsystemSpecialProperties) {
    BuildableSubsystemSpecialProperties.Parse = (reader) => {
        const property = {
            type: 'BuildableSubsystemSpecialProperties',
            buildables: [],
            currentLightweightVersion: 0
        };
        if (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.LightweightBuildableSubsystemWritesRuntimeVersion) {
            property.currentLightweightVersion = reader.readInt32();
        }
        const entriesCount = reader.readInt32();
        if (entriesCount > 0) {
            for (let i = 0; i < entriesCount; i++) {
                const typeReference = ObjectReference_1.ObjectReference.read(reader);
                const count = reader.readInt32();
                const instances = [];
                for (let j = 0; j < count; j++) {
                    instances.push(BuildableTypeInstance.Parse(reader, property.currentLightweightVersion ?? 1));
                }
                property.buildables.push({
                    typeReference,
                    instances
                });
            }
        }
        return property;
    };
    BuildableSubsystemSpecialProperties.Serialize = (writer, property) => {
        if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.LightweightBuildableSubsystemWritesRuntimeVersion) {
            writer.writeInt32(property.currentLightweightVersion ?? 1);
        }
        writer.writeInt32(Object.keys(property.buildables).length);
        if (Object.keys(property.buildables).length > 0) {
            for (const buildable of property.buildables) {
                ObjectReference_1.ObjectReference.write(writer, buildable.typeReference);
                writer.writeInt32(buildable.instances.length);
                for (const instance of buildable.instances) {
                    BuildableTypeInstance.Serialize(writer, instance, property.currentLightweightVersion ?? 1);
                }
            }
        }
    };
})(BuildableSubsystemSpecialProperties || (exports.BuildableSubsystemSpecialProperties = BuildableSubsystemSpecialProperties = {}));
var BuildableTypeInstance;
(function (BuildableTypeInstance) {
    BuildableTypeInstance.Parse = (reader, lightWeightVersion) => {
        const transform = Transform_1.Transform.Parse(reader);
        const usedSwatchSlot = ObjectReference_1.ObjectReference.read(reader);
        const usedMaterial = ObjectReference_1.ObjectReference.read(reader);
        const usedPattern = ObjectReference_1.ObjectReference.read(reader);
        const usedSkin = ObjectReference_1.ObjectReference.read(reader);
        const primaryColor = col4_1.col4.ParseRGBA(reader);
        const secondaryColor = col4_1.col4.ParseRGBA(reader);
        const usedPaintFinish = ObjectReference_1.ObjectReference.read(reader);
        const patternRotation = reader.readByte();
        const usedRecipe = ObjectReference_1.ObjectReference.read(reader);
        const blueprintProxy = ObjectReference_1.ObjectReference.read(reader);
        let instanceSpecificData;
        if (lightWeightVersion >= runtime_buildable_instance_data_version_1.RuntimeBuildableInstanceDataVersion.AddedTypeSpecificData) {
            instanceSpecificData = FGDynamicStruct_1.FGDynamicStruct.Parse(reader);
        }
        let builtBy;
        if (lightWeightVersion >= runtime_buildable_instance_data_version_1.RuntimeBuildableInstanceDataVersion.AddedBuiltBy) {
            builtBy = FPlayerInfoHandle_1.FPlayerInfoHandle.read(reader);
        }
        return {
            transform,
            primaryColor,
            secondaryColor,
            usedSwatchSlot,
            usedMaterial,
            usedPattern,
            usedSkin,
            usedRecipe,
            usedPaintFinish,
            patternRotation,
            blueprintProxy,
            instanceSpecificData,
            builtBy
        };
    };
    BuildableTypeInstance.Serialize = (writer, instance, lightweightVersion) => {
        Transform_1.Transform.Serialize(writer, instance.transform);
        ObjectReference_1.ObjectReference.write(writer, instance.usedSwatchSlot);
        ObjectReference_1.ObjectReference.write(writer, instance.usedMaterial);
        ObjectReference_1.ObjectReference.write(writer, instance.usedPattern);
        ObjectReference_1.ObjectReference.write(writer, instance.usedSkin);
        col4_1.col4.SerializeRGBA(writer, instance.primaryColor);
        col4_1.col4.SerializeRGBA(writer, instance.secondaryColor);
        ObjectReference_1.ObjectReference.write(writer, instance.usedPaintFinish);
        writer.writeByte(instance.patternRotation);
        ObjectReference_1.ObjectReference.write(writer, instance.usedRecipe);
        ObjectReference_1.ObjectReference.write(writer, instance.blueprintProxy);
        if (lightweightVersion >= runtime_buildable_instance_data_version_1.RuntimeBuildableInstanceDataVersion.AddedTypeSpecificData) {
            FGDynamicStruct_1.FGDynamicStruct.Serialize(writer, instance.instanceSpecificData);
        }
        if (lightweightVersion >= runtime_buildable_instance_data_version_1.RuntimeBuildableInstanceDataVersion.AddedBuiltBy) {
            FPlayerInfoHandle_1.FPlayerInfoHandle.write(writer, instance.builtBy);
        }
    };
})(BuildableTypeInstance || (exports.BuildableTypeInstance = BuildableTypeInstance = {}));
;
//# sourceMappingURL=BuildableSubsystemSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const vec3_1 = __r(18);
const vec4_1 = __r(81);
var Transform;
(function (Transform) {
    Transform.ParseF = (reader) => {
        return {
            rotation: vec4_1.vec4.ParseF(reader),
            translation: vec3_1.vec3.ParseF(reader),
            scale3d: vec3_1.vec3.ParseF(reader),
        };
    };
    Transform.Parse = (reader) => {
        return {
            rotation: vec4_1.vec4.Parse(reader),
            translation: vec3_1.vec3.Parse(reader),
            scale3d: vec3_1.vec3.Parse(reader),
        };
    };
    Transform.Serialize = (writer, transform) => {
        vec4_1.vec4.Serialize(writer, transform.rotation);
        vec3_1.vec3.Serialize(writer, transform.translation);
        vec3_1.vec3.Serialize(writer, transform.scale3d);
    };
    Transform.SerializeF = (writer, transform) => {
        vec4_1.vec4.SerializeF(writer, transform.rotation);
        vec3_1.vec3.SerializeF(writer, transform.translation);
        vec3_1.vec3.SerializeF(writer, transform.scale3d);
    };
})(Transform || (exports.Transform = Transform = {}));
//# sourceMappingURL=Transform.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeBuildableInstanceDataVersion = void 0;
var RuntimeBuildableInstanceDataVersion;
(function (RuntimeBuildableInstanceDataVersion) {
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["NoVersion"] = 0] = "NoVersion";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["InitialVersion"] = 1] = "InitialVersion";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["AddedTypeSpecificData"] = 2] = "AddedTypeSpecificData";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["AddedBuiltBy"] = 3] = "AddedBuiltBy";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["FixedUpInvalidPatternRotations"] = 4] = "FixedUpInvalidPatternRotations";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["VersionPlusOne"] = 5] = "VersionPlusOne";
    RuntimeBuildableInstanceDataVersion[RuntimeBuildableInstanceDataVersion["LatestVersion"] = 4] = "LatestVersion";
})(RuntimeBuildableInstanceDataVersion || (exports.RuntimeBuildableInstanceDataVersion = RuntimeBuildableInstanceDataVersion = {}));
//# sourceMappingURL=runtime-buildable-instance-data-version.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitSpecialProperties = exports.isCircuitSpecialProperties = void 0;
const ObjectReference_1 = __r(17);
const isCircuitSpecialProperties = (obj) => obj.type === 'CircuitSpecialProperties';
exports.isCircuitSpecialProperties = isCircuitSpecialProperties;
var CircuitSpecialProperties;
(function (CircuitSpecialProperties) {
    CircuitSpecialProperties.Parse = (reader) => {
        const count = reader.readInt32();
        const circuits = [];
        for (let i = 0; i < count; i++) {
            circuits.push({
                id: reader.readInt32(),
                objectReference: ObjectReference_1.ObjectReference.read(reader)
            });
        }
        return {
            type: 'CircuitSpecialProperties',
            circuits
        };
    };
    CircuitSpecialProperties.Serialize = (writer, property) => {
        writer.writeInt32(property.circuits.length);
        for (const circuit of property.circuits) {
            writer.writeInt32(circuit.id);
            ObjectReference_1.ObjectReference.write(writer, circuit.objectReference);
        }
    };
})(CircuitSpecialProperties || (exports.CircuitSpecialProperties = CircuitSpecialProperties = {}));
//# sourceMappingURL=CircuitSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConveyorChainActorSpecialProperties = exports.isConveyorChainActorSpecialProperties = void 0;
const FConveyorBeltItem_1 = __r(97);
const FConveyorChainSplineSegment_1 = __r(98);
const ObjectReference_1 = __r(17);
const isConveyorChainActorSpecialProperties = (obj) => obj.type === 'ConveyorChainActorSpecialProperties';
exports.isConveyorChainActorSpecialProperties = isConveyorChainActorSpecialProperties;
var ConveyorChainActorSpecialProperties;
(function (ConveyorChainActorSpecialProperties) {
    ConveyorChainActorSpecialProperties.Parse = (reader) => {
        const lastBelt = ObjectReference_1.ObjectReference.read(reader);
        const firstBelt = ObjectReference_1.ObjectReference.read(reader);
        const countBeltsInChain = reader.readInt32();
        const beltsInChain = [];
        for (let i = 0; i < countBeltsInChain; i++) {
            beltsInChain.push(FConveyorChainSplineSegment_1.FConveyorChainSplineSegment.read(reader));
        }
        const totalLength = reader.readFloat32();
        const totalNumberItemsMaybe = reader.readInt32();
        const firstChainItemIndex = reader.readInt32();
        const lastChainItemIndex = reader.readInt32();
        const countItemsInChain = reader.readInt32();
        const items = [];
        for (let n = 0; n < countItemsInChain; n++) {
            items.push(FConveyorBeltItem_1.FConveyorBeltItem.read(reader));
        }
        return {
            type: 'ConveyorChainActorSpecialProperties',
            firstBelt: firstBelt,
            lastBelt: lastBelt,
            beltsInChain,
            totalLength,
            totalNumberItemsMaybe,
            firstChainItemIndex,
            lastChainItemIndex,
            items
        };
    };
    ConveyorChainActorSpecialProperties.Serialize = (writer, property) => {
        ObjectReference_1.ObjectReference.write(writer, property.lastBelt);
        ObjectReference_1.ObjectReference.write(writer, property.firstBelt);
        writer.writeInt32(property.beltsInChain.length);
        for (const belt of property.beltsInChain) {
            FConveyorChainSplineSegment_1.FConveyorChainSplineSegment.write(writer, belt);
        }
        writer.writeFloat32(property.totalLength);
        writer.writeInt32(property.totalNumberItemsMaybe);
        writer.writeInt32(property.firstChainItemIndex);
        writer.writeInt32(property.lastChainItemIndex);
        writer.writeInt32(property.items.length);
        for (const item of property.items) {
            FConveyorBeltItem_1.FConveyorBeltItem.write(writer, item);
        }
    };
})(ConveyorChainActorSpecialProperties || (exports.ConveyorChainActorSpecialProperties = ConveyorChainActorSpecialProperties = {}));
//# sourceMappingURL=ConveyorChainActorSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FConveyorBeltItem = void 0;
const FInventoryItem_1 = __r(68);
var FConveyorBeltItem;
(function (FConveyorBeltItem) {
    function read(reader) {
        return {
            item: FInventoryItem_1.FInventoryItem.read(reader),
            position: reader.readFloat32()
        };
    }
    FConveyorBeltItem.read = read;
    function write(writer, value) {
        FInventoryItem_1.FInventoryItem.write(writer, value.item);
        writer.writeFloat32(value.position);
    }
    FConveyorBeltItem.write = write;
})(FConveyorBeltItem || (exports.FConveyorBeltItem = FConveyorBeltItem = {}));
;
//# sourceMappingURL=FConveyorBeltItem.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FConveyorChainSplineSegment = void 0;
const ObjectReference_1 = __r(17);
const vec3_1 = __r(18);
var FConveyorChainSplineSegment;
(function (FConveyorChainSplineSegment) {
    function read(reader) {
        const chainActorRef = ObjectReference_1.ObjectReference.read(reader);
        const beltRef = ObjectReference_1.ObjectReference.read(reader);
        const splinePointsCount = reader.readInt32();
        const splinePoints = [];
        for (let j = 0; j < splinePointsCount; j++) {
            splinePoints.push({
                location: vec3_1.vec3.Parse(reader),
                arriveTangent: vec3_1.vec3.Parse(reader),
                leaveTangent: vec3_1.vec3.Parse(reader),
            });
        }
        const offsetAtStart = reader.readFloat32();
        const startsAtLength = reader.readFloat32();
        const endsAtLength = reader.readFloat32();
        const firstItemIndex = reader.readInt32();
        const lastItemIndex = reader.readInt32();
        const beltIndexInChain = reader.readInt32();
        return {
            chainActorRef,
            beltRef,
            splinePoints,
            offsetAtStart,
            startsAtLength,
            endsAtLength,
            firstItemIndex,
            lastItemIndex,
            beltIndexInChain
        };
    }
    FConveyorChainSplineSegment.read = read;
    function write(writer, belt) {
        ObjectReference_1.ObjectReference.write(writer, belt.chainActorRef);
        ObjectReference_1.ObjectReference.write(writer, belt.beltRef);
        writer.writeInt32(belt.splinePoints.length);
        for (const splinepoint of belt.splinePoints) {
            vec3_1.vec3.Serialize(writer, splinepoint.location);
            vec3_1.vec3.Serialize(writer, splinepoint.arriveTangent);
            vec3_1.vec3.Serialize(writer, splinepoint.leaveTangent);
        }
        writer.writeFloat32(belt.offsetAtStart);
        writer.writeFloat32(belt.startsAtLength);
        writer.writeFloat32(belt.endsAtLength);
        writer.writeInt32(belt.firstItemIndex);
        writer.writeInt32(belt.lastItemIndex);
        writer.writeInt32(belt.beltIndexInChain);
    }
    FConveyorChainSplineSegment.write = write;
})(FConveyorChainSplineSegment || (exports.FConveyorChainSplineSegment = FConveyorChainSplineSegment = {}));
//# sourceMappingURL=FConveyorChainSplineSegment.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConveyorSpecialProperties = exports.isConveyorSpecialProperties = void 0;
const isConveyorSpecialProperties = (obj) => obj.type === 'ConveyorSpecialProperties';
exports.isConveyorSpecialProperties = isConveyorSpecialProperties;
var ConveyorSpecialProperties;
(function (ConveyorSpecialProperties) {
    ConveyorSpecialProperties.Parse = (reader) => {
        reader.readInt32Zero();
        return {
            type: 'ConveyorSpecialProperties',
        };
    };
    ConveyorSpecialProperties.Serialize = (writer, property) => {
        writer.writeInt32Zero();
    };
})(ConveyorSpecialProperties || (exports.ConveyorSpecialProperties = ConveyorSpecialProperties = {}));
//# sourceMappingURL=ConveyorSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySpecialProperties = exports.isEmptySpecialProperties = void 0;
const isEmptySpecialProperties = (obj) => obj.type === 'EmptySpecialProperties';
exports.isEmptySpecialProperties = isEmptySpecialProperties;
var EmptySpecialProperties;
(function (EmptySpecialProperties) {
    EmptySpecialProperties.Parse = (reader) => {
        return {
            type: 'EmptySpecialProperties',
        };
    };
    EmptySpecialProperties.Serialize = (writer, property) => { };
})(EmptySpecialProperties || (exports.EmptySpecialProperties = EmptySpecialProperties = {}));
//# sourceMappingURL=EmptySpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectsListSpecialProperties = exports.isObjectsListSpecialProperties = void 0;
const object_references_list_1 = __r(78);
const isObjectsListSpecialProperties = (obj) => obj.type === 'ObjectsListSpecialProperties';
exports.isObjectsListSpecialProperties = isObjectsListSpecialProperties;
var ObjectsListSpecialProperties;
(function (ObjectsListSpecialProperties) {
    ObjectsListSpecialProperties.Parse = (reader) => {
        const objectsList = object_references_list_1.ObjectReferencesList.ReadList(reader);
        return {
            type: 'ObjectsListSpecialProperties',
            objects: objectsList
        };
    };
    ObjectsListSpecialProperties.Serialize = (writer, property) => {
        object_references_list_1.ObjectReferencesList.SerializeList(writer, property.objects);
    };
})(ObjectsListSpecialProperties || (exports.ObjectsListSpecialProperties = ObjectsListSpecialProperties = {}));
//# sourceMappingURL=ObjectsListSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSpecialProperties = exports.isPlayerSpecialProperties = void 0;
const isPlayerSpecialProperties = (obj) => obj.type === 'PlayerSpecialProperties';
exports.isPlayerSpecialProperties = isPlayerSpecialProperties;
var PlayerSpecialProperties;
(function (PlayerSpecialProperties) {
    PlayerSpecialProperties.Parse = (reader) => {
        const flag = reader.readByte();
        const property = {
            type: 'PlayerSpecialProperties',
            flag
        };
        switch (property.flag) {
            case 248:
                const eos = reader.readString();
                property.eosData = reader.readString();
                break;
            case 25:
                break;
            default:
                break;
        }
        return property;
    };
    PlayerSpecialProperties.Serialize = (writer, property) => {
        writer.writeByte(property.flag);
        switch (property.flag) {
            case 248:
                writer.writeString('EOS');
                writer.writeString(property.eosData);
                break;
            case 25:
                break;
            default:
                break;
        }
    };
})(PlayerSpecialProperties || (exports.PlayerSpecialProperties = PlayerSpecialProperties = {}));
//# sourceMappingURL=PlayerSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerLineSpecialProperties = exports.isPowerLineSpecialProperties = void 0;
const save_custom_version_1 = __r(8);
const ObjectReference_1 = __r(17);
const vec3_1 = __r(18);
const isPowerLineSpecialProperties = (obj) => obj.type === 'PowerLineSpecialProperties';
exports.isPowerLineSpecialProperties = isPowerLineSpecialProperties;
var PowerLineSpecialProperties;
(function (PowerLineSpecialProperties) {
    PowerLineSpecialProperties.Parse = (reader, remainingLen) => {
        const start = reader.getBufferPosition();
        const property = {
            type: 'PowerLineSpecialProperties',
            source: ObjectReference_1.ObjectReference.read(reader),
            target: ObjectReference_1.ObjectReference.read(reader)
        };
        if (reader.context.blueprintConfigVersion !== undefined && reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.AddedCachedLocationsForWire) {
            if (remainingLen - (reader.getBufferPosition() - start) >= 24) {
                property.sourceTranslation = vec3_1.vec3.ParseF(reader);
                property.targetTranslation = vec3_1.vec3.ParseF(reader);
            }
        }
        return property;
    };
    PowerLineSpecialProperties.Serialize = (writer, property) => {
        ObjectReference_1.ObjectReference.write(writer, property.source);
        ObjectReference_1.ObjectReference.write(writer, property.target);
        if (writer.context.blueprintConfigVersion !== undefined && writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.AddedCachedLocationsForWire) {
            if (property.sourceTranslation && property.targetTranslation) {
                vec3_1.vec3.SerializeF(writer, property.sourceTranslation);
                vec3_1.vec3.SerializeF(writer, property.targetTranslation);
            }
        }
    };
})(PowerLineSpecialProperties || (exports.PowerLineSpecialProperties = PowerLineSpecialProperties = {}));
//# sourceMappingURL=PowerLineSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialDroneActionProperties = exports.isSpecialDroneActionProperties = void 0;
const PropertiesList_1 = __r(45);
const isSpecialDroneActionProperties = (obj) => obj.type === 'SpecialDroneActionProperties';
exports.isSpecialDroneActionProperties = isSpecialDroneActionProperties;
var SpecialDroneActionProperties;
(function (SpecialDroneActionProperties) {
    SpecialDroneActionProperties.Parse = (reader) => {
        reader.readInt32();
        const countActiveActions = reader.readInt32();
        const activeActions = [];
        for (let i = 0; i < countActiveActions; i++) {
            activeActions.push({
                actionName: reader.readString(),
                properties: PropertiesList_1.PropertiesList.ParseList(reader)
            });
        }
        const countQueuedActions = reader.readInt32();
        const queuedActions = [];
        for (let i = 0; i < countQueuedActions; i++) {
            queuedActions.push({
                actionName: reader.readString(),
                properties: PropertiesList_1.PropertiesList.ParseList(reader)
            });
        }
        return {
            type: 'SpecialDroneActionProperties',
            activeActions,
            queuedActions
        };
    };
    SpecialDroneActionProperties.Serialize = (writer, property) => {
        writer.writeInt32(0);
        writer.writeInt32(property.activeActions.length);
        for (const action of property.activeActions) {
            writer.writeString(action.actionName);
            PropertiesList_1.PropertiesList.SerializeList(writer, action.properties);
        }
        writer.writeInt32(property.queuedActions.length);
        for (const action of property.queuedActions) {
            writer.writeString(action.actionName);
            PropertiesList_1.PropertiesList.SerializeList(writer, action.properties);
        }
    };
})(SpecialDroneActionProperties || (exports.SpecialDroneActionProperties = SpecialDroneActionProperties = {}));
//# sourceMappingURL=SpecialDroneActionProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleSpecialProperties = exports.isVehicleSpecialProperties = void 0;
const ObjectReference_1 = __r(17);
const VehiclePhysicsData_1 = __r(106);
const isVehicleSpecialProperties = (obj) => obj.type === 'VehicleSpecialProperties';
exports.isVehicleSpecialProperties = isVehicleSpecialProperties;
var VehicleSpecialProperties;
(function (VehicleSpecialProperties) {
    VehicleSpecialProperties.Parse = (reader, remainingLen, typePath) => {
        const start = reader.getBufferPosition();
        const objects = [];
        const countObjects = reader.readInt32();
        for (let i = 0; i < countObjects; i++) {
            objects.push(VehiclePhysicsData_1.VehiclePhysicsData.Parse(reader));
        }
        const property = {
            type: 'VehicleSpecialProperties',
            objects
        };
        const reminingVehicleSize = (remainingLen - (reader.getBufferPosition() - start));
        if ((typePath === '/Game/FactoryGame/Buildable/Vehicle/Train/Locomotive/BP_Locomotive.BP_Locomotive_C'
            || typePath === '/Game/FactoryGame/Buildable/Vehicle/Train/Wagon/BP_FreightWagon.BP_FreightWagon_C') && reminingVehicleSize > 0) {
            property.vehicleInFront = ObjectReference_1.ObjectReference.read(reader);
            property.vehicleBehind = ObjectReference_1.ObjectReference.read(reader);
        }
        return property;
    };
    VehicleSpecialProperties.Serialize = (writer, property) => {
        writer.writeInt32(property.objects.length);
        for (const object of property.objects) {
            VehiclePhysicsData_1.VehiclePhysicsData.Serialize(writer, object);
        }
        if (property.vehicleInFront !== undefined
            && property.vehicleBehind !== undefined) {
            ObjectReference_1.ObjectReference.write(writer, property.vehicleInFront);
            ObjectReference_1.ObjectReference.write(writer, property.vehicleBehind);
        }
    };
})(VehicleSpecialProperties || (exports.VehicleSpecialProperties = VehicleSpecialProperties = {}));
//# sourceMappingURL=VehicleSpecialProperties.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclePhysicsData = void 0;
const vec3_1 = __r(18);
const vec4_1 = __r(81);
var VehiclePhysicsData;
(function (VehiclePhysicsData) {
    VehiclePhysicsData.Parse = (reader) => ({
        boneName: reader.readString(),
        position: vec3_1.vec3.Parse(reader),
        rotation: vec4_1.vec4.Parse(reader),
        angVelocity: vec3_1.vec3.Parse(reader),
        linVelocity: vec3_1.vec3.Parse(reader),
        flags: reader.readByte()
    });
    VehiclePhysicsData.Serialize = (writer, data) => {
        writer.writeString(data.boneName);
        vec3_1.vec3.Serialize(writer, data.position);
        vec4_1.vec4.Serialize(writer, data.rotation);
        vec3_1.vec3.Serialize(writer, data.angVelocity);
        vec3_1.vec3.Serialize(writer, data.linVelocity);
        writer.writeByte(data.flags);
    };
})(VehiclePhysicsData || (exports.VehiclePhysicsData = VehiclePhysicsData = {}));
;
//# sourceMappingURL=VehiclePhysicsData.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveEntity = exports.isSaveEntity = void 0;
const ObjectReference_1 = __r(17);
const Transform_1 = __r(93);
const SaveObject_1 = __r(44);
const isSaveEntity = (obj) => {
    return obj !== null && typeof obj === 'object' && 'type' in obj && obj.type === 'SaveEntity';
};
exports.isSaveEntity = isSaveEntity;
class SaveEntity extends SaveObject_1.SaveObject {
    constructor(typePath, rootObject, instanceName, parentEntityName = '', needsTransform = false) {
        super(typePath, rootObject, instanceName);
        this.typePath = typePath;
        this.rootObject = rootObject;
        this.instanceName = instanceName;
        this.parentEntityName = parentEntityName;
        this.type = 'SaveEntity';
        this.needTransform = needsTransform;
        this.wasPlacedInLevel = false;
        this.parentObject = { levelName: '', pathName: '' };
        this.transform = {
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            translation: { x: 0, y: 0, z: 0 },
            scale3d: { x: 1, y: 1, z: 1 }
        };
        this.components = [];
    }
    static ParseHeader(reader, obj) {
        SaveObject_1.SaveObject.ParseHeader(reader, obj);
        obj.needTransform = reader.readInt32() == 1;
        obj.transform = Transform_1.Transform.ParseF(reader);
        obj.wasPlacedInLevel = reader.readInt32() == 1;
    }
    static ParseData(entity, length, reader, typePath) {
        const start = reader.getBufferPosition();
        entity.parentObject = ObjectReference_1.ObjectReference.read(reader);
        var componentCount = reader.readInt32();
        for (let i = 0; i < componentCount; i++) {
            var componentRef = ObjectReference_1.ObjectReference.read(reader);
            entity.components.push(componentRef);
        }
        const remainingSize = length - (reader.getBufferPosition() - start);
        return SaveObject_1.SaveObject.ParseData(entity, remainingSize, reader, typePath);
    }
    static SerializeHeader(writer, entity) {
        SaveObject_1.SaveObject.SerializeHeader(writer, entity);
        writer.writeInt32(entity.needTransform ? 1 : 0);
        Transform_1.Transform.SerializeF(writer, entity.transform);
        writer.writeInt32(entity.wasPlacedInLevel ? 1 : 0);
    }
    static SerializeData(writer, entity) {
        ObjectReference_1.ObjectReference.write(writer, entity.parentObject);
        writer.writeInt32(entity.components.length);
        for (const component of entity.components) {
            writer.writeString(component.levelName);
            writer.writeString(component.pathName);
        }
        SaveObject_1.SaveObject.SerializeData(writer, entity);
    }
}
exports.SaveEntity = SaveEntity;
SaveEntity.TypeID = 1;
//# sourceMappingURL=SaveEntity.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelToDestroyedActorsMap = void 0;
const ObjectReference_1 = __r(17);
var LevelToDestroyedActorsMap;
(function (LevelToDestroyedActorsMap) {
    LevelToDestroyedActorsMap.read = (reader) => {
        const count = reader.readInt32();
        const map = {};
        for (let i = 0; i < count; i++) {
            const key = reader.readString();
            const elements = [];
            const elementCount = reader.readInt32();
            for (let j = 0; j < elementCount; j++) {
                elements.push(ObjectReference_1.ObjectReference.read(reader));
            }
            map[key] = elements;
        }
        return map;
    };
    LevelToDestroyedActorsMap.write = (writer, map) => {
        writer.writeInt32(Object.keys(map).length);
        for (const entry of Object.entries(map)) {
            writer.writeString(entry[0]);
            writer.writeInt32(Object.keys(entry[1]).length);
            for (const actor of entry[1]) {
                ObjectReference_1.ObjectReference.write(writer, actor);
            }
        }
    };
})(LevelToDestroyedActorsMap || (exports.LevelToDestroyedActorsMap = LevelToDestroyedActorsMap = {}));
//# sourceMappingURL=level-to-destroyed-actors-map.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintConfigWriter = exports.BlueprintWriter = void 0;
const alignment_enum_1 = __r(21);
const context_writer_1 = __r(110);
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const EUnrealEngineObjectUE5Version_1 = __r(24);
const save_writer_1 = __r(112);
const toc_blob_1 = __r(42);
const SaveComponent_1 = __r(43);
const SaveEntity_1 = __r(107);
class BlueprintWriter extends context_writer_1.ContextWriter {
    constructor() {
        super(alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.INITIAL_VERSION);
    }
    generateChunks(compressionInfo, posAfterHeader, options) {
        if (posAfterHeader <= 0) {
            throw new parser_error_1.ParserError('ParserError', 'seems like this buffer has no header. Please write the header first before you can generate chunks.');
        }
        const header = new Uint8Array(this.bufferArray.slice(0, posAfterHeader));
        if (options.onHeader !== undefined) {
            options.onHeader(header);
        }
        this.bufferArray = this.bufferArray.slice(posAfterHeader);
        const chunkSummary = save_writer_1.SaveWriter.GenerateCompressedChunksFromData(this.bufferArray, compressionInfo, 'blueprint', options.onBinaryBeforeCompressing ?? (() => { }), options.onChunk ?? (() => { }), this.alignment);
        return chunkSummary;
    }
    static SerializeObjects(writer, objects) {
        const headersLenIndicator = writer.getBufferPosition();
        writer.writeInt32(0);
        toc_blob_1.TOCBlob.SerializeAllObjectHeaders(writer, objects);
        writer.writeBinarySizeFromPosition(headersLenIndicator, headersLenIndicator + 4);
        BlueprintWriter.SerializeObjectContents(writer, objects);
    }
    static SerializeObjectContents(writer, objects) {
        const lenIndicatorEntities = writer.getBufferPosition();
        writer.writeInt32(0);
        writer.writeInt32(objects.length);
        for (const obj of objects) {
            const lenReplacementPosition = writer.getBufferPosition();
            writer.writeInt32(0);
            if ((0, SaveEntity_1.isSaveEntity)(obj)) {
                SaveEntity_1.SaveEntity.SerializeData(writer, obj);
            }
            else if ((0, SaveComponent_1.isSaveComponent)(obj)) {
                SaveComponent_1.SaveComponent.SerializeData(writer, obj);
            }
            writer.writeBinarySizeFromPosition(lenReplacementPosition, lenReplacementPosition + 4);
        }
        writer.writeBinarySizeFromPosition(lenIndicatorEntities, lenIndicatorEntities + 4);
    }
}
exports.BlueprintWriter = BlueprintWriter;
class BlueprintConfigWriter extends context_writer_1.ContextWriter {
    constructor() {
        super(alignment_enum_1.Alignment.LITTLE_ENDIAN);
    }
}
exports.BlueprintConfigWriter = BlueprintConfigWriter;
//# sourceMappingURL=blueprint-writer.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextWriter = void 0;
const byte_writer_class_1 = __r(111);
class ContextWriter extends byte_writer_class_1.ByteWriter {
    constructor() {
        super(...arguments);
        this.context = {};
    }
}
exports.ContextWriter = ContextWriter;
;
//# sourceMappingURL=context-writer.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteWriter = void 0;
const alignment_enum_1 = __r(21);
class ByteWriter {
    constructor(alignment, bufferSize = 500) {
        this.getBufferPosition = () => this.currentByte;
        this.getBufferSlice = (start, end) => this.bufferArray.slice(start, end);
        this.getBufferLength = () => this.bufferArray.byteLength;
        this.getBufferProgress = () => this.currentByte / this.bufferArray.byteLength;
        this.alignment = alignment;
        this.bufferArray = new ArrayBuffer(bufferSize);
        this.bufferView = new DataView(this.bufferArray);
        this.currentByte = 0;
    }
    skipBytes(count = 1) {
        this.extendBufferIfNeeded(count);
        this.currentByte += count;
    }
    jumpTo(pos) {
        const count = pos - this.getBufferPosition();
        this.skipBytes(count);
    }
    writeByte(value) {
        this.extendBufferIfNeeded(1);
        this.bufferView.setUint8(this.currentByte, value);
        this.currentByte += 1;
    }
    writeBytesArray(bytes) {
        this.writeBytes(new Uint8Array(bytes));
    }
    writeBytes(bytes) {
        this.extendBufferIfNeeded(bytes.length);
        bytes.forEach(byte => this.bufferView.setUint8(this.currentByte++, byte));
    }
    hexStringRepresentationToBytes(hex, hexSeparator = ' ') {
        const cleanHex = hex.split(hexSeparator).join('').replace(/\s+/g, '');
        const bytes = Array.from({ length: cleanHex.length / 2 }, (_, i) => parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16));
        return bytes;
    }
    writeHex(hex, hexSeparator = ' ') {
        this.writeBytesArray(this.hexStringRepresentationToBytes(hex, hexSeparator));
    }
    writeInt8(value) {
        this.extendBufferIfNeeded(1);
        this.bufferView.setInt8(this.currentByte, value);
        this.currentByte += 1;
    }
    writeUint8(value) {
        this.writeByte(value);
    }
    writeInt16(value) {
        this.extendBufferIfNeeded(2);
        this.bufferView.setInt16(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 2;
    }
    writeUint16(value) {
        this.extendBufferIfNeeded(2);
        this.bufferView.setUint16(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 2;
    }
    writeInt32(value) {
        this.extendBufferIfNeeded(4);
        this.bufferView.setInt32(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
    }
    writeInt32Zero() {
        this.writeInt32(0);
    }
    writeUint32(value) {
        this.extendBufferIfNeeded(4);
        this.bufferView.setUint32(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
    }
    writeInt64(value) {
        this.extendBufferIfNeeded(8);
        this.bufferView.setBigInt64(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
    }
    writeUint64(value) {
        this.extendBufferIfNeeded(8);
        this.bufferView.setBigUint64(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
    }
    writeFloat32(value) {
        this.extendBufferIfNeeded(4);
        this.bufferView.setFloat32(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 4;
    }
    writeDouble(value) {
        this.extendBufferIfNeeded(8);
        this.bufferView.setFloat64(this.currentByte, value, this.alignment === alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.currentByte += 8;
    }
    writeString(value) {
        if (value.length === 0) {
            this.writeInt32(0);
            return;
        }
        if (ByteWriter.IsASCIICompatible(value)) {
            this.writeInt32(value.length + 1);
            for (let i = 0; i < value.length; i++) {
                this.writeByte(value.charCodeAt(i));
            }
            this.writeUint8(0);
        }
        else {
            this.writeInt32(-value.length - 1);
            for (let i = 0; i < value.length; i++) {
                this.writeUint16(value.charCodeAt(i));
            }
            this.writeUint16(0);
        }
    }
    writeBinarySizeFromPosition(lenIndicatorPos, start) {
        const after = this.getBufferPosition();
        const writtenBytes = after - start;
        this.jumpTo(lenIndicatorPos);
        this.writeInt32(writtenBytes);
        this.jumpTo(after);
    }
    writeInt32At(position, value) {
        const here = this.getBufferPosition();
        this.jumpTo(position);
        this.writeInt32(value);
        this.jumpTo(here);
    }
    extendBufferIfNeeded(countNeededBytes, factor = 1.5) {
        if (this.currentByte + countNeededBytes > this.bufferView.byteLength) {
            this.bufferArray = ByteWriter.AppendBuffer(this.bufferArray, new ArrayBuffer(factor * this.bufferArray.byteLength));
            this.bufferView = new DataView(this.bufferArray);
        }
    }
    truncateBuffer() {
        this.bufferArray = this.bufferArray.slice(0, this.currentByte);
    }
    endWriting() {
        this.truncateBuffer();
        return this.bufferArray;
    }
    static ToInt32(num) {
        return new Uint8Array([
            (num & 0xff000000) >> 24,
            (num & 0x00ff0000) >> 16,
            (num & 0x0000ff00) >> 8,
            (num & 0x000000ff)
        ]);
    }
    static AppendBuffer(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }
    ;
}
exports.ByteWriter = ByteWriter;
ByteWriter.IsASCIICompatible = (value) => /^[\x00-\x7F]*$/.test(value);
//# sourceMappingURL=byte-writer.class.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveWriter = void 0;
const alignment_enum_1 = __r(21);
const context_writer_1 = __r(110);
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const EUnrealEngineObjectUE5Version_1 = __r(24);
const level_1 = __r(113);
const save_body_chunks_1 = __r(25);
class SaveWriter extends context_writer_1.ContextWriter {
    constructor() {
        super(alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.INITIAL_VERSION);
    }
    static WriteLevels(writer, save) {
        writer.writeInt32(Object.keys(save.levels).length - 1);
        for (const level of Object.values(save.levels)) {
            if (level.name !== save.header.mapName) {
                writer.writeString(level.name);
            }
            level_1.Level.Serialize(writer, level);
        }
    }
    static GenerateCompressedChunksFromData(bufferArray, compressionInfo, blueprintOrSave, onBinaryBeforeCompressing, onChunk, alignment = alignment_enum_1.Alignment.LITTLE_ENDIAN) {
        return save_body_chunks_1.SaveBodyChunks.CompressDataIntoChunks(bufferArray, compressionInfo, blueprintOrSave, onBinaryBeforeCompressing, onChunk, alignment);
    }
    generateChunks(compressionInfo, posAfterHeader, onBinaryBeforeCompressing, onHeader, onChunk) {
        if (posAfterHeader <= 0) {
            throw new parser_error_1.ParserError('ParserError', 'Seems like this buffer has no header. Please write the header first before you can generate chunks.');
        }
        const header = new Uint8Array(this.bufferArray.slice(0, posAfterHeader));
        onHeader(header);
        this.bufferArray = this.bufferArray.slice(posAfterHeader);
        const chunkSummary = SaveWriter.GenerateCompressedChunksFromData(this.bufferArray, compressionInfo, 'save', onBinaryBeforeCompressing, onChunk, this.alignment);
        return chunkSummary;
    }
}
exports.SaveWriter = SaveWriter;
//# sourceMappingURL=save-writer.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
const hierarchical_version_context_1 = __r(2);
const FSaveObjectVersionData_1 = __r(11);
const data_blob_1 = __r(114);
const level_to_destroyed_actors_map_1 = __r(108);
const object_references_list_1 = __r(78);
const save_custom_version_1 = __r(8);
const toc_blob_1 = __r(42);
var Level;
(function (Level) {
    function Read(reader, levelName) {
        const level = {
            name: levelName,
            objects: [],
            collectables: [],
            writesDestroyedActorsInTOCBlob: false
        };
        const isPersistentLevel = reader.context.mapName === levelName;
        const tocBlobMarker = toc_blob_1.TOCBlob.SkipOver(reader);
        const dataBlobMarker = data_blob_1.DataBlob.SkipOver(reader);
        if (!isPersistentLevel) {
            if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializePerStreamableLevelTOCVersion) {
                level.saveCustomVersion = reader.readInt32();
            }
        }
        if (isPersistentLevel) {
            level.destroyedActorsMap = level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.read(reader);
        }
        else {
            level.collectables = object_references_list_1.ObjectReferencesList.ReadList(reader);
            if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                const shouldSerializePerObjectVersionData = reader.readInt32() >= 1;
                if (shouldSerializePerObjectVersionData) {
                    level.objectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
                }
            }
        }
        hierarchical_version_context_1.HierarchyVersion.SetOnLevel(reader.context.saveVersion, level.saveCustomVersion);
        hierarchical_version_context_1.HierarchyVersion.SetOnLevel(reader.context.packageFileVersionUE5, level.objectVersionData?.packageFileVersion.ue5Version);
        const endOfLevelPosition = reader.getBufferPosition();
        reader.jumpTo(tocBlobMarker.position);
        toc_blob_1.TOCBlob.Read(reader, level.objects);
        let remainingSize = tocBlobMarker.length - (reader.getBufferPosition() - tocBlobMarker.position);
        if (remainingSize > 0) {
            if (isPersistentLevel) {
                level.destroyedActorsMap = level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.read(reader);
            }
            else {
                level.collectables = object_references_list_1.ObjectReferencesList.ReadList(reader);
            }
            level.writesDestroyedActorsInTOCBlob = true;
        }
        if (remainingSize < 0) {
            console.warn(`remaining size ${remainingSize} not > 0 in level ${level.name}. Save may be corrupt.`);
        }
        reader.jumpTo(dataBlobMarker.position);
        data_blob_1.DataBlob.Read(levelName, reader, level.objects, dataBlobMarker.length, reader.onProgressCallback);
        level.objects = level.objects.filter(Boolean);
        reader.jumpTo(endOfLevelPosition);
        return level;
    }
    Level.Read = Read;
    function Serialize(writer, level) {
        hierarchical_version_context_1.HierarchyVersion.SetOnLevel(writer.context.saveVersion, level.saveCustomVersion);
        hierarchical_version_context_1.HierarchyVersion.SetOnLevel(writer.context.packageFileVersionUE5, level.objectVersionData?.packageFileVersion.ue5Version);
        const isPersistentLevel = writer.context.mapName === level.name;
        toc_blob_1.TOCBlob.Write(writer, level, isPersistentLevel);
        data_blob_1.DataBlob.Write(writer, level.objects, level.name);
        if (!isPersistentLevel) {
            if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializePerStreamableLevelTOCVersion) {
                writer.writeInt32(level.saveCustomVersion ?? save_custom_version_1.SaveCustomVersion.SerializePerStreamableLevelTOCVersion);
            }
        }
        if (isPersistentLevel) {
            level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.write(writer, level.destroyedActorsMap ?? {});
        }
        else {
            object_references_list_1.ObjectReferencesList.SerializeList(writer, level.collectables);
            if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                writer.writeInt32(level.objectVersionData !== undefined ? 1 : 0);
                if (level.objectVersionData !== undefined) {
                    FSaveObjectVersionData_1.FSaveObjectVersionData.write(writer, level.objectVersionData);
                }
            }
        }
    }
    Level.Serialize = Serialize;
})(Level || (exports.Level = Level = {}));
//# sourceMappingURL=level.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBlob = void 0;
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const SaveComponent_1 = __r(43);
const SaveEntity_1 = __r(107);
const FSaveObjectVersionData_1 = __r(11);
const save_custom_version_1 = __r(8);
var DataBlob;
(function (DataBlob) {
    function SkipOver(reader) {
        const dataBlobBinaryLength = reader.readInt32();
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            reader.readInt32Zero();
        }
        const posBeforeDataBlob = reader.getBufferPosition();
        reader.skipBytes(dataBlobBinaryLength);
        return {
            position: posBeforeDataBlob,
            length: dataBlobBinaryLength
        };
    }
    DataBlob.SkipOver = SkipOver;
    function Read(levelName, reader, objectsList, binaryLength, onProgressCallback) {
        const posBefore = reader.getBufferPosition();
        const countEntities = reader.readInt32();
        if (countEntities !== objectsList.length) {
            throw new Error(`possibly corrupt. entity count ${countEntities} does not equal object count of ${objectsList.length}`);
        }
        const batchSize = 10000;
        let readObjectsCount = 0;
        let lastProgressReport = 0;
        while (readObjectsCount < countEntities) {
            ReadNObjectContents(reader, Math.min(batchSize, countEntities - readObjectsCount), objectsList, readObjectsCount);
            readObjectsCount += Math.min(batchSize, countEntities - readObjectsCount);
            if (readObjectsCount - lastProgressReport > batchSize) {
                onProgressCallback(reader.getBufferProgress(), `read object count [${(readObjectsCount)}/${(countEntities)}] in level ${levelName}`);
                lastProgressReport = readObjectsCount;
            }
        }
        const after = reader.getBufferPosition();
        if (after - posBefore !== binaryLength) {
            console.warn(`save seems corrupt. Level ${levelName} is not even obeying the object count checksum.`, levelName);
        }
    }
    DataBlob.Read = Read;
    function ReadNObjectContents(reader, count, objects, objectListOffset = 0) {
        for (let i = 0; i < count; i++) {
            if (reader.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
                objects[i + objectListOffset].saveCustomVersion = reader.readInt32();
            }
            hierarchical_version_context_1.HierarchyVersion.SetOnObject(reader.context.saveVersion, objects[i + objectListOffset].saveCustomVersion);
            if (reader.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
                objects[i + objectListOffset].shouldMigrateObjectRefsToPersistent = reader.readInt32() >= 1;
            }
            const binarySize = reader.readInt32();
            const posBeforeObject = reader.getBufferPosition();
            reader.skipBytes(binarySize);
            if (reader.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                const shouldSerializePerObjectVersionData = reader.readInt32() === 1;
                if (shouldSerializePerObjectVersionData) {
                    objects[i + objectListOffset].objectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
                }
            }
            hierarchical_version_context_1.HierarchyVersion.SetOnObject(reader.context.packageFileVersionUE5, objects[i + objectListOffset].objectVersionData?.packageFileVersion.ue5Version);
            const posAfterObject = reader.getBufferPosition();
            reader.jumpTo(posBeforeObject);
            let after = reader.getBufferPosition();
            try {
                if ((0, SaveEntity_1.isSaveEntity)(objects[i + objectListOffset])) {
                    SaveEntity_1.SaveEntity.ParseData(objects[i + objectListOffset], binarySize, reader, objects[i + objectListOffset].typePath);
                }
                else if ((0, SaveComponent_1.isSaveComponent)(objects[i + objectListOffset])) {
                    SaveComponent_1.SaveComponent.ParseData(objects[i + objectListOffset], binarySize, reader, objects[i + objectListOffset].typePath);
                }
                after = reader.getBufferPosition();
                if (after - posBeforeObject !== binarySize) {
                    throw new parser_error_1.CorruptSaveError(`Could not read entity ${objects[i + objectListOffset].instanceName}, as ${after - posBeforeObject} bytes were read, but ${binarySize} bytes were indicated.`);
                }
            }
            catch (error) {
                if (reader.context.throwErrors) {
                    throw error;
                }
                else {
                    console.warn(`Could not read object ${objects[i + objectListOffset].instanceName} of type ${objects[i + objectListOffset].typePath} as a whole. will be removed from level's object list.`);
                    reader.skipBytes(posBeforeObject - reader.getBufferPosition() + binarySize);
                    objects[i + objectListOffset] = null;
                }
            }
            reader.jumpTo(posAfterObject);
        }
    }
    DataBlob.ReadNObjectContents = ReadNObjectContents;
    function Write(writer, objects, levelName) {
        const lenIndicatorEntities = writer.getBufferPosition();
        writer.writeInt32(0);
        if (writer.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            writer.writeInt32Zero();
        }
        const lenEntitiesStart = writer.getBufferPosition();
        writer.writeInt32(objects.length);
        for (const obj of objects) {
            hierarchical_version_context_1.HierarchyVersion.SetOnObject(writer.context.saveVersion, obj.saveCustomVersion);
            if (writer.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
                writer.writeInt32(obj.saveCustomVersion);
            }
            if (writer.context.saveVersion.level >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
                writer.writeInt32(obj.shouldMigrateObjectRefsToPersistent ? 1 : 0);
            }
            const lenReplacementPosition = writer.getBufferPosition();
            writer.writeInt32(0);
            let before = writer.getBufferPosition(), after = writer.getBufferPosition();
            if ((0, SaveEntity_1.isSaveEntity)(obj)) {
                SaveEntity_1.SaveEntity.SerializeData(writer, obj);
                after = writer.getBufferPosition();
            }
            else if ((0, SaveComponent_1.isSaveComponent)(obj)) {
                SaveComponent_1.SaveComponent.SerializeData(writer, obj);
                after = writer.getBufferPosition();
            }
            hierarchical_version_context_1.HierarchyVersion.SetOnObject(writer.context.packageFileVersionUE5, obj.objectVersionData?.packageFileVersion.ue5Version);
            if (writer.context.saveVersion.object >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                writer.writeInt32(obj.objectVersionData !== undefined ? 1 : 0);
                if (obj.objectVersionData !== undefined) {
                    FSaveObjectVersionData_1.FSaveObjectVersionData.write(writer, obj.objectVersionData);
                }
            }
            writer.writeInt32At(lenReplacementPosition, after - before);
        }
        const lenEntitiesEnd = writer.getBufferPosition();
        writer.writeInt32At(lenIndicatorEntities, lenEntitiesEnd - lenEntitiesStart);
    }
    DataBlob.Write = Write;
})(DataBlob || (exports.DataBlob = DataBlob = {}));
//# sourceMappingURL=data-blob.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactorySave = void 0;
class SatisfactorySave {
    constructor(name, header) {
        this.saveBodyValidation = { grids: {} };
        this.levels = {};
        this.name = name;
        this.header = header;
        if (header.saveName !== undefined) {
            this.name = header.saveName;
        }
    }
}
exports.SatisfactorySave = SatisfactorySave;
//# sourceMappingURL=satisfactory-save.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactorySaveHeader = void 0;
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const MD5Hash_1 = __r(117);
const save_custom_version_1 = __r(8);
const save_header_type_1 = __r(118);
const save_reader_1 = __r(119);
var SatisfactorySaveHeader;
(function (SatisfactorySaveHeader) {
    SatisfactorySaveHeader.Parse = (reader) => {
        const header = {
            saveHeaderType: 0,
            saveVersion: 0,
            buildVersion: 0,
            mapName: "DEFAULT",
            mapOptions: "",
            sessionName: "",
            playDurationSeconds: 0,
            saveDateTime: "0",
            sessionVisibility: 0
        };
        header.saveHeaderType = reader.readInt32();
        header.saveVersion = reader.readInt32();
        header.buildVersion = reader.readInt32();
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveName) {
            header.saveName = reader.readString();
        }
        header.mapName = reader.readString();
        reader.context.mapName = header.mapName;
        header.mapOptions = reader.readString();
        header.sessionName = reader.readString();
        header.playDurationSeconds = reader.readInt32();
        const rawSaveDateTimeInTicks = reader.readLong();
        const unixMilliseconds = (rawSaveDateTimeInTicks - save_reader_1.SaveReader.EPOCH_TICKS) / 10000n;
        header.saveDateTime = unixMilliseconds.toString();
        header.sessionVisibility = reader.readByte();
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.UE425EngineUpdate) {
            header.fEditorObjectVersion = reader.readInt32();
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedModdingParams) {
            header.rawModMetadataString = reader.readString();
            try {
                header.modMetadata = JSON.parse(header.rawModMetadataString);
            }
            catch (error) {
            }
            header.isModdedSave = reader.readInt32();
        }
        reader.context.saveHeaderType = header.saveHeaderType;
        reader.context.saveVersion = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(header.saveVersion);
        reader.context.buildVersion = header.buildVersion;
        reader.context.mods = Object.fromEntries(header.modMetadata?.Mods?.map(mod => [mod.Reference, mod.Version]) ?? []);
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveIdentifier) {
            header.saveIdentifier = reader.readString();
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedWorldPartitionSupport) {
            header.partitionEnabledFlag = reader.readInt32() === 1;
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveModificationChecksum) {
            header.consistencyHashBytes = MD5Hash_1.MD5Hash.read(reader);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedIsCreativeModeEnabled) {
            header.creativeModeEnabled = reader.readInt32() == 1;
        }
        if (header.saveVersion < save_custom_version_1.SaveCustomVersion.SaveFileIsCompressed) {
            throw new parser_error_1.UnsupportedVersionError("The save version is too old to support encoding currently. Save in newer game version.");
        }
        return header;
    };
    SatisfactorySaveHeader.Serialize = (writer, header) => {
        writer.writeInt32(header.saveHeaderType);
        writer.writeInt32(header.saveVersion);
        writer.writeInt32(header.buildVersion);
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveName) {
            writer.writeString(header.saveName ?? '');
        }
        writer.writeString(header.mapName);
        writer.writeString(header.mapOptions);
        writer.writeString(header.sessionName);
        writer.writeInt32(header.playDurationSeconds);
        writer.writeInt64(BigInt(header.saveDateTime) * 10000n + save_reader_1.SaveReader.EPOCH_TICKS);
        writer.writeByte(header.sessionVisibility);
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.UE425EngineUpdate) {
            writer.writeInt32(header.fEditorObjectVersion);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedModdingParams) {
            if (header.modMetadata) {
                writer.writeString(JSON.stringify(header.modMetadata));
            }
            else {
                writer.writeString(header.rawModMetadataString);
            }
            writer.writeInt32(header.isModdedSave);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveIdentifier) {
            writer.writeString(header.saveIdentifier);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedWorldPartitionSupport) {
            writer.writeInt32(header.partitionEnabledFlag ? 1 : 0);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedSaveModificationChecksum) {
            MD5Hash_1.MD5Hash.write(writer, header.consistencyHashBytes);
        }
        if (header.saveHeaderType >= save_header_type_1.SaveHeaderType.AddedIsCreativeModeEnabled) {
            writer.writeInt32(header.creativeModeEnabled ? 1 : 0);
        }
        if (header.saveVersion < save_custom_version_1.SaveCustomVersion.SaveFileIsCompressed) {
            throw new parser_error_1.UnsupportedVersionError("The save version is too old to be supported currently.");
        }
    };
})(SatisfactorySaveHeader || (exports.SatisfactorySaveHeader = SatisfactorySaveHeader = {}));
//# sourceMappingURL=satisfactory-save-header.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MD5Hash = void 0;
var MD5Hash;
(function (MD5Hash) {
    MD5Hash.read = (reader) => {
        const md5Hash = { isValid: false };
        md5Hash.isValid = reader.readInt32() === 1;
        if (md5Hash.isValid) {
            md5Hash.hash = Array.from(reader.readBytes(16));
        }
        return md5Hash;
    };
    MD5Hash.write = (writer, md5Hash) => {
        writer.writeInt32(md5Hash.isValid ? 1 : 0);
        if (md5Hash.isValid) {
            writer.writeBytesArray(md5Hash.hash);
        }
    };
})(MD5Hash || (exports.MD5Hash = MD5Hash = {}));
;
//# sourceMappingURL=MD5Hash.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveHeaderType = void 0;
var SaveHeaderType;
(function (SaveHeaderType) {
    SaveHeaderType[SaveHeaderType["InitialVersion"] = 0] = "InitialVersion";
    SaveHeaderType[SaveHeaderType["PrepareForLoadingMaps"] = 1] = "PrepareForLoadingMaps";
    SaveHeaderType[SaveHeaderType["AddedSessionId"] = 2] = "AddedSessionId";
    SaveHeaderType[SaveHeaderType["AddedPlayDuration"] = 3] = "AddedPlayDuration";
    SaveHeaderType[SaveHeaderType["SessionIDStringAndSaveTimeAdded"] = 4] = "SessionIDStringAndSaveTimeAdded";
    SaveHeaderType[SaveHeaderType["AddedSessionVisibility"] = 5] = "AddedSessionVisibility";
    SaveHeaderType[SaveHeaderType["LookAtTheComment"] = 6] = "LookAtTheComment";
    SaveHeaderType[SaveHeaderType["UE425EngineUpdate"] = 7] = "UE425EngineUpdate";
    SaveHeaderType[SaveHeaderType["AddedModdingParams"] = 8] = "AddedModdingParams";
    SaveHeaderType[SaveHeaderType["UE426EngineUpdate"] = 9] = "UE426EngineUpdate";
    SaveHeaderType[SaveHeaderType["AddedSaveIdentifier"] = 10] = "AddedSaveIdentifier";
    SaveHeaderType[SaveHeaderType["AddedWorldPartitionSupport"] = 11] = "AddedWorldPartitionSupport";
    SaveHeaderType[SaveHeaderType["AddedSaveModificationChecksum"] = 12] = "AddedSaveModificationChecksum";
    SaveHeaderType[SaveHeaderType["AddedIsCreativeModeEnabled"] = 13] = "AddedIsCreativeModeEnabled";
    SaveHeaderType[SaveHeaderType["AddedSaveName"] = 14] = "AddedSaveName";
    SaveHeaderType[SaveHeaderType["VersionPlusOne"] = 15] = "VersionPlusOne";
    SaveHeaderType[SaveHeaderType["LatestVersion"] = 14] = "LatestVersion";
})(SaveHeaderType || (exports.SaveHeaderType = SaveHeaderType = {}));
//# sourceMappingURL=save-header-type.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveReader = exports.DEFAULT_SATISFACTORY_CHUNK_HEADER_SIZE = void 0;
const alignment_enum_1 = __r(21);
const context_reader_1 = __r(22);
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const EUnrealEngineObjectUE5Version_1 = __r(24);
const level_1 = __r(113);
const save_body_chunks_1 = __r(25);
const save_custom_version_1 = __r(8);
exports.DEFAULT_SATISFACTORY_CHUNK_HEADER_SIZE = 49;
class SaveReader extends context_reader_1.ContextReader {
    constructor(fileBuffer, onProgressCallback = () => { }) {
        super(fileBuffer, alignment_enum_1.Alignment.LITTLE_ENDIAN);
        this.onProgressCallback = onProgressCallback;
        this.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(EUnrealEngineObjectUE5Version_1.EUnrealEngineObjectUE5Version.INITIAL_VERSION);
    }
    inflateChunks() {
        const result = save_body_chunks_1.SaveBodyChunks.DecompressChunks(this.fileBuffer.slice(this.currentByte), this.alignment);
        this.currentByte = 0;
        this.fileBuffer = result.uncompressedData.buffer;
        this.maxByte = this.fileBuffer.byteLength;
        this.bufferView = new DataView(this.fileBuffer);
        const totalBodyRestSize = this.readInt32();
        const extraBytes = (this.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5 ? 8 : 4);
        if (result.uncompressedData.byteLength !== (totalBodyRestSize + extraBytes)) {
            throw new parser_error_1.CorruptSaveError(`Possibly corrupt. Indicated size of total save body (${totalBodyRestSize + extraBytes}) does not match the uncompressed real size of ${result.uncompressedData.byteLength}.`);
        }
        return {
            compressionInfo: result.compressionInfo
        };
    }
    readLevels() {
        if (!this.context.saveVersion || !this.context.saveHeaderType) {
            throw new parser_error_1.ParserError('ParserError', 'Header and its context must be set before objects can be read.');
        }
        const approximateSaveVersion = SaveReader.GetApproximateSaveVersion(this.context.saveVersion.header);
        if (approximateSaveVersion === '<U6') {
            throw new parser_error_1.UnsupportedVersionError('Game Version < U6 is not supported in the parser. Please save the file in a newer game version.');
        }
        const levels = {};
        const levelCount = this.readInt32();
        this.onProgressCallback(this.getBufferProgress(), `reading pack of ${levelCount + 1} levels.`);
        for (let i = 0; i <= levelCount; i++) {
            let levelSingleName = i === levelCount ? this.context.mapName : this.readString();
            if (i % 500 === 0) {
                this.onProgressCallback(this.getBufferProgress(), `reading level [${(i + 1)}/${(levelCount + 1)}] ${levelSingleName}`);
            }
            levels[levelSingleName] = level_1.Level.Read(this, levelSingleName);
        }
        return levels;
    }
}
exports.SaveReader = SaveReader;
SaveReader.EPOCH_TICKS = 621355968000000000n;
SaveReader.GetApproximateSaveVersion = (saveVersion) => {
    if (SaveReader.IsGameVersionAtLeast_U1_2(saveVersion)) {
        return 'U1.2+';
    }
    else if (SaveReader.IsGameVersionAtLeast_U1_1(saveVersion)) {
        return 'U1.1';
    }
    else if (SaveReader.IsGameVersionAtLeast_U1(saveVersion)) {
        return 'U1.0';
    }
    else if (SaveReader.IsGameVersionAtLeast_U8(saveVersion)) {
        return 'U8';
    }
    else if (SaveReader.IsGameVersionAtLeast_U6_U7(saveVersion)) {
        return 'U6/U7';
    }
    else {
        return '<U6';
    }
};
SaveReader.IsGameVersionAtLeast_U1_2 = (saveVersion) => saveVersion >= save_custom_version_1.SaveCustomVersion.FixNewPlayerInfoHandleSerializationFormat;
SaveReader.IsGameVersionAtLeast_U1_1 = (saveVersion) => saveVersion >= save_custom_version_1.SaveCustomVersion.SerializePerStreamableLevelTOCVersion;
SaveReader.IsGameVersionAtLeast_U1 = (saveVersion) => saveVersion >= save_custom_version_1.SaveCustomVersion.Version1;
SaveReader.IsGameVersionAtLeast_U8 = (saveVersion) => saveVersion >= save_custom_version_1.SaveCustomVersion.UnrealEngine5;
SaveReader.IsGameVersionAtLeast_U6_U7 = (saveVersion) => saveVersion >= save_custom_version_1.SaveCustomVersion.AddedSublevelStreaming;
//# sourceMappingURL=save-reader.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveBodyValidation = void 0;
var SaveBodyValidation;
(function (SaveBodyValidation) {
    SaveBodyValidation.Parse = (reader) => {
        const grids = {};
        const count = reader.readInt32();
        for (let i = 0; i < count; i++) {
            const gridName = reader.readString();
            const cellSize = reader.readInt32();
            const gridHash = reader.readUint32();
            grids[gridName] = { children: {}, cellSize, gridHash };
            const childrenCount = reader.readUint32();
            for (let i = 0; i < childrenCount; i++) {
                const levelInstanceName = reader.readString();
                const cellHash = reader.readUint32();
                grids[gridName].children[levelInstanceName] = cellHash;
            }
        }
        return {
            grids
        };
    };
    SaveBodyValidation.Serialize = (writer, saveBodyValidation) => {
        writer.writeInt32(Object.entries(saveBodyValidation.grids).length);
        for (const gridEntry of Object.entries(saveBodyValidation.grids)) {
            writer.writeString(gridEntry[0]);
            writer.writeInt32(gridEntry[1].cellSize);
            writer.writeUint32(gridEntry[1].gridHash);
            writer.writeUint32(Object.values(gridEntry[1].children).length);
            for (const child of Object.entries(gridEntry[1].children)) {
                writer.writeString(child[0]);
                writer.writeUint32(child[1]);
            }
        }
    };
})(SaveBodyValidation || (exports.SaveBodyValidation = SaveBodyValidation = {}));
//# sourceMappingURL=SaveBodyValidation.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=binary-operable.interface.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=binary-readable.interface.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=binary-writable.interface.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=reader-writer-context.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintHeaderVersion = void 0;
var BlueprintHeaderVersion;
(function (BlueprintHeaderVersion) {
    BlueprintHeaderVersion[BlueprintHeaderVersion["InitialVersion"] = 0] = "InitialVersion";
    BlueprintHeaderVersion[BlueprintHeaderVersion["AddedItemCosts"] = 1] = "AddedItemCosts";
    BlueprintHeaderVersion[BlueprintHeaderVersion["AddedUsedRecipes"] = 2] = "AddedUsedRecipes";
    BlueprintHeaderVersion[BlueprintHeaderVersion["VersionPlusOne"] = 3] = "VersionPlusOne";
    BlueprintHeaderVersion[BlueprintHeaderVersion["LatestVersion"] = 2] = "LatestVersion";
})(BlueprintHeaderVersion || (exports.BlueprintHeaderVersion = BlueprintHeaderVersion = {}));
//# sourceMappingURL=blueprint-header-version.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=blueprint.types.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDIT = void 0;
const SWATCH_DESC_CONCRETE = '/Game/FactoryGame/Buildable/-Shared/Customization/Swatches/SwatchDesc_Concrete.SwatchDesc_Concrete_C';
const SWATCH_SLOT_DEFAULT_0 = '/Game/FactoryGame/Buildable/-Shared/Customization/Swatches/SwatchDesc_Slot0.SwatchDesc_Slot0_C';
const SWATCH_SLOT_DEFAULT_FOUNDATIONS = '/Game/FactoryGame/Buildable/-Shared/Customization/Swatches/SwatchDesc_Slot16.SwatchDesc_Slot16_C';
exports.EDIT = {
    ENTITIES: {
        FOUNDATION: {
            FLAT: {
                NORMAL_8x1_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_Foundation_8x1_01.Build_Foundation_8x1_01_C',
                    CLASS_NAME: 'Build_Foundation_8x1_01_C',
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Foundations/Recipe_Foundation_8x1_01.Recipe_Foundation_8x1_01_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                NORMAL_8x2_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_Foundation_8x1_01.Build_Foundation_8x2_01_C',
                    CLASS_NAME: 'Build_Foundation_8x2_01_C',
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Foundations/Recipe_Foundation_8x2_01.Recipe_Foundation_8x2_01_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                NORMAL_8x4_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_Foundation_8x1_01.Build_Foundation_8x4_01_C',
                    CLASS_NAME: 'Build_Foundation_8x4_01_C',
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Foundations/Recipe_Foundation_8x4_01.Recipe_Foundation_8x4_01_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Foundation_Concrete_8x1.Build_Foundation_Concrete_8x1_C',
                    CLASS_NAME: 'Build_Foundation_Concrete_8x1_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Recipe_Foundation_Concrete_8x1.Recipe_Foundation_Concrete_8x1_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                },
                CONCRETE_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Foundation_Concrete_8x2.Build_Foundation_Concrete_8x2_C',
                    CLASS_NAME: 'Build_Foundation_Concrete_8x2_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Recipe_Foundation_Concrete_8x1.Recipe_Foundation_Concrete_8x1_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Foundation_Concrete_8x4.Build_Foundation_Concrete_8x4_C',
                    CLASS_NAME: 'Foundation_Concrete_8x4_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Recipe_Foundation_Concrete_8x4.Recipe_Foundation_Concrete_8x4_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Foundation_Metal_8x4.Build_Foundation_Metal_8x1_C',
                    CLASS_NAME: 'Build_Foundation_Metal_8x1_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_Foundation_Metal_8x4.Recipe_Foundation_Metal_8x1_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Foundation_Metal_8x4.Build_Foundation_Metal_8x2_C',
                    CLASS_NAME: 'Build_Foundation_Metal_8x2_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_Foundation_Metal_8x4.Recipe_Foundation_Metal_8x2_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Foundation_Metal_8x4.Build_Foundation_Metal_8x4_C',
                    CLASS_NAME: 'Build_Foundation_Metal_8x4_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_Foundation_Metal_8x4.Recipe_Foundation_Metal_8x4_C',
                    DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                },
                CONCRETE_POLISHED_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Foundation_ConcretePolished_8x4.Build_Foundation_ConcretePolished_8x1_C',
                    CLASS_NAME: 'Build_Foundation_ConcretePolished_8x1_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Recipe_Foundation_ConcretePolished_8x4.Recipe_Foundation_ConcretePolished_8x1_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                },
                CONCRETE_POLISHED_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Foundation_ConcretePolished_8x4.Build_Foundation_ConcretePolished_8x2_C',
                    CLASS_NAME: 'Build_Foundation_ConcretePolished_8x2_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Recipe_Foundation_ConcretePolished_8x4.Recipe_Foundation_ConcretePolished_8x2_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                },
                CONCRETE_POLISHED_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Foundation_ConcretePolished_8x4.Build_Foundation_ConcretePolished_8x4_C',
                    CLASS_NAME: 'Build_Foundation_ConcretePolished_8x4_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Recipe_Foundation_ConcretePolished_8x4.Recipe_Foundation_ConcretePolished_8x4_C',
                    DEFAULT_SWATCH: SWATCH_DESC_CONCRETE
                }
            },
            HALF: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddle_Ficsit_8x1.Build_QuarterPipeMiddle_Ficsit_8x1_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Ficsit_8x1_C',
                    RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Recipe_QuarterPipeMiddle_Ficsit_4x1.Recipe_QuarterPipeMiddle_Ficsit_4x1_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddle_Ficsit_8x2.Build_QuarterPipeMiddle_Ficsit_8x2_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Ficsit_8x2_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddle_Ficsit_8x4.Build_QuarterPipeMiddle_Ficsit_8x4_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Ficsit_8x4_C'
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddle_Concrete_8x1.Build_QuarterPipeMiddle_Concrete_8x1_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Concrete_8x1_C'
                },
                CONCRETE_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddle_Concrete_8x2.Build_QuarterPipeMiddle_Concrete_8x2_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Concrete_8x2_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddle_Concrete_8x4.Build_QuarterPipeMiddle_Concrete_8x4_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Concrete_8x4_C'
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddle_Grip_8x1.Build_QuarterPipeMiddle_Grip_8x1_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Grip_8x1_C'
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddle_Grip_8x2.Build_QuarterPipeMiddle_Grip_8x2_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Grip_8x2_C'
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddle_Grip_8x4.Build_QuarterPipeMiddle_Grip_8x4_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Grip_8x4_C'
                },
                CONCRETE_POLISHED_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddle_PolishedConcrete_8x1.Build_QuarterPipeMiddle_PolishedConcrete_8x1_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_PolishedConcrete_8x1_C'
                },
                CONCRETE_POLISHED_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddle_PolishedConcrete_8x2.Build_QuarterPipeMiddle_PolishedConcrete_8x2_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_PolishedConcrete_8x2_C'
                },
                CONCRETE_POLISHED_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddle_PolishedConcrete_8x4.Build_QuarterPipeMiddle_PolishedConcrete_8x4_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_PolishedConcrete_8x4_C'
                },
                ASPHALT_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddle_Asphalt_8x1.Build_QuarterPipeMiddle_Asphalt_8x1_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Asphalt_8x1_C'
                },
                ASPHALT_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddle_Asphalt_8x2.Build_QuarterPipeMiddle_Asphalt_8x2_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Asphalt_8x2_C'
                },
                ASPHALT_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddle_Asphalt_8x4.Build_QuarterPipeMiddle_Asphalt_8x4_C',
                    CLASS_NAME: 'Build_QuarterPipeMiddle_Asphalt_8x4_C'
                }
            },
            RAMP: {
                SINGLE: {
                    NORMAL_8x1_01: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_8x1_01.Build_Ramp_8x1_01_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_8x1_01.Recipe_Ramp_8x1_01_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x2_01: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_8x2_01.Build_Ramp_8x2_01_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_8x2_01.Recipe_Ramp_8x2_01_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x4_01: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_8x4_01.Build_Ramp_8x4_01_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_8x4_01.Recipe_Ramp_8x4_01_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    CONCRETE_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_Concrete_8x1.Build_Ramp_Concrete_8x1_C',
                        CLASS_NAME: 'Build_Ramp_Concrete_8x1_C'
                    },
                    CONCRETE_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_Concrete_8x2.Build_Ramp_Concrete_8x2_C',
                        CLASS_NAME: 'Build_Ramp_Concrete_8x2_C'
                    },
                    CONCRETE_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_Concrete_8x4.Build_Ramp_Concrete_8x4_C',
                        CLASS_NAME: 'Build_Ramp_Concrete_8x4_C'
                    },
                    METAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_Metal_8x1.Build_Ramp_Metal_8x1_C',
                        CLASS_NAME: 'Build_Ramp_Metal_8x1_C'
                    },
                    METAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_Metal_8x2.Build_Ramp_Metal_8x2_C',
                        CLASS_NAME: 'Build_Ramp_Metal_8x2_C'
                    },
                    METAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_Metal_8x4.Build_Ramp_Metal_8x4_C',
                        CLASS_NAME: 'Build_Ramp_Metal_8x4_C'
                    },
                    CONCRETE_POLISHED_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_Polished_8x1.Build_Ramp_Polished_8x1_C',
                        CLASS_NAME: 'Build_Ramp_Polished_8x1_C'
                    },
                    CONCRETE_POLISHED_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_Polished_8x2.Build_Ramp_Polished_8x2_C',
                        CLASS_NAME: 'Build_Ramp_Polished_8x2_C'
                    },
                    CONCRETE_POLISHED_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_Polished_8x4.Build_Ramp_Polished_8x4_C',
                        CLASS_NAME: 'Build_Ramp_Polished_8x4_C'
                    },
                    ASPHALT_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_Asphalt_8x1.Build_Ramp_Asphalt_8x1_C',
                        CLASS_NAME: 'Build_Ramp_Asphalt_8x1_C'
                    },
                    ASPHALT_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_Asphalt_8x2.Build_Ramp_Asphalt_8x2_C',
                        CLASS_NAME: 'Build_Ramp_Asphalt_8x2_C'
                    },
                    ASPHALT_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_Asphalt_8x4.Build_Ramp_Asphalt_8x4_C',
                        CLASS_NAME: 'Build_Ramp_Asphalt_8x4_C'
                    }
                },
                DOUBLE: {
                    NORMAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampDouble_8x1.Build_RampDouble_8x1_C',
                        CLASS_NAME: 'Build_RampDouble_8x1_C',
                        RECIPE: 'Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_RampDouble_8x1.Recipe_RampDouble_8x1_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampDouble.Build_RampDouble_C',
                        CLASS_NAME: 'Build_RampDouble_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_8x8x8.Build_Ramp_8x8x8_C',
                        CLASS_NAME: 'Build_Ramp_8x8x8_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    METAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_RampDouble_Metal_8x1.Build_RampDouble_Metal_8x1_C',
                        CLASS_NAME: 'Build_RampDouble_Metal_8x1_C',
                        RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_RampDouble_Metal_8x1.Recipe_RampDouble_Metal_8x1_C'
                    },
                    METAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_RampDouble_Metal_8x2.Build_RampDouble_Metal_8x2_C',
                        CLASS_NAME: 'Build_RampDouble_Metal_8x2_C',
                        RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_RampDouble_Metal_8x2.Recipe_RampDouble_Metal_8x2_C'
                    },
                    METAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_RampDouble_Metal_8x4.Build_RampDouble_Metal_8x4_C',
                        CLASS_NAME: 'Build_RampDouble_Metal_8x4_C',
                        RECIPE: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Recipe_RampDouble_Metal_8x4.Recipe_RampDouble_Metal_8x4_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    CONCRETE_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_RampDouble_Concrete_8x1.Build_RampDouble_Concrete_8x1_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    CONCRETE_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_RampDouble_Concrete_8x2.Build_RampDouble_Concrete_8x2_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    CONCRETE_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_RampDouble_Concrete_8x4.Build_RampDouble_Concrete_8x4_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    CONCRETE_POLISHED_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_RampDouble_Polished_8x1.Build_RampDouble_Polished_8x1_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    CONCRETE_POLISHED_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_RampDouble_Polished_8x2.Build_RampDouble_Polished_8x2_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    CONCRETE_POLISHED_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_RampDouble_Polished_8x4.Build_RampDouble_Polished_8x4_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    ASPHALT_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_RampDouble_Asphalt_8x1.Build_RampDouble_Asphalt_8x1_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    ASPHALT_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_RampDouble_Asphalt_8x2.Build_RampDouble_Asphalt_8x2_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                    ASPHALT_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_RampDouble_Asphalt_8x4.Build_RampDouble_Asphalt_8x4_C',
                        CLASS_NAME: 'Build_RampDouble_Concrete_8x1_C'
                    },
                },
                UPCORNER: {
                    NORMAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x1_02.Build_Ramp_Diagonal_8x1_02_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_Diagonal_8x1_02.Recipe_Ramp_Diagonal_8x1_02_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x2_02.Build_Ramp_Diagonal_8x2_02_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_Diagonal_8x2_02.Recipe_Ramp_Diagonal_8x2_02_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    NORMAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x4_02.Build_Ramp_Diagonal_8x4_02_C',
                        RECIPE: '/Game/FactoryGame/Recipes/Buildings/Ramps/Recipe_Ramp_Diagonal_8x4_02.Recipe_Ramp_Diagonal_8x4_02_C',
                        DEFAULT_SWATCH: SWATCH_SLOT_DEFAULT_FOUNDATIONS
                    },
                    METAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_UpCorner_Metal_8x1.Build_Ramp_UpCorner_Metal_8x1_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Metal_8x1_C'
                    },
                    METAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_UpCorner_Metal_8x2.Build_Ramp_UpCorner_Metal_8x2_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Metal_8x2_C'
                    },
                    METAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_UpCorner_Metal_8x4.Build_Ramp_UpCorner_Metal_8x4_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Metal_8x4_C'
                    },
                    CONCRETE_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_UpCorner_Concrete_8x1.Build_Ramp_UpCorner_Concrete_8x1_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Concrete_8x1_C'
                    },
                    CONCRETE_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_UpCorner_Concrete_8x2.Build_Ramp_UpCorner_Concrete_8x2_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Concrete_8x2_C'
                    },
                    CONCRETE_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_UpCorner_Concrete_8x4.Build_Ramp_UpCorner_Concrete_8x4_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Concrete_8x4_C'
                    },
                    CONCRETE_POLISHED_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_UpCorner_Polished_8x1.Build_Ramp_UpCorner_Polished_8x1_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Polished_8x1_C'
                    },
                    CONCRETE_POLISHED_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_UpCorner_Polished_8x2.Build_Ramp_UpCorner_Polished_8x2_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Polished_8x2_C'
                    },
                    CONCRETE_POLISHED_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_UpCorner_Polished_8x4.Build_Ramp_UpCorner_Polished_8x4_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Polished_8x4_C'
                    },
                    ASPHALT_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_UpCorner_Asphalt_8x1.Build_Ramp_UpCorner_Asphalt_8x1_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Asphalt_8x1_C'
                    },
                    ASPHALT_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_UpCorner_Asphalt_8x2.Build_Ramp_UpCorner_Asphalt_8x2_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Asphalt_8x2_C'
                    },
                    ASPHALT_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_UpCorner_Asphalt_8x4.Build_Ramp_UpCorner_Asphalt_8x4_C',
                        CLASS_NAME: 'Build_Ramp_UpCorner_Asphalt_8x4_C'
                    },
                },
                DOWNCORNER: {
                    NORMAL_8x1_C: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x1_01.Build_Ramp_Diagonal_8x1_01_C',
                        CLASS_NAME: 'Build_Ramp_Diagonal_8x1_01_C'
                    },
                    NORMAL_8x2_C: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x2_01.Build_Ramp_Diagonal_8x2_01_C',
                        CLASS_NAME: 'Build_Ramp_Diagonal_8x2_01_C'
                    },
                    NORMAL_8x4_C: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Diagonal_8x4_01.Build_Ramp_Diagonal_8x4_01_C',
                        CLASS_NAME: 'Build_Ramp_Diagonal_8x4_01_C'
                    },
                    METAL_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_DownCorner_Metal_8x1.Build_Ramp_DownCorner_Metal_8x1_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Metal_8x1_C'
                    },
                    METAL_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_DownCorner_Metal_8x2.Build_Ramp_DownCorner_Metal_8x2_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Metal_8x2_C'
                    },
                    METAL_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Ramp_DownCorner_Metal_8x4.Build_Ramp_DownCorner_Metal_8x4_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Metal_8x4_C'
                    },
                    CONCRETE_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_DownCorner_Concrete_8x1.Build_Ramp_DownCorner_Concrete_8x1_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Concrete_8x1_C'
                    },
                    CONCRETE_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_DownCorner_Concrete_8x2.Build_Ramp_DownCorner_Concrete_8x2_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Concrete_8x2_C'
                    },
                    CONCRETE_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Ramp_DownCorner_Concrete_8x4.Build_Ramp_DownCorner_Concrete_8x4_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Concrete_8x4_C'
                    },
                    CONCRETE_POLISHED_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_DownCorner_Polished_8x1.Build_Ramp_DownCorner_Polished_8x1_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Polished_8x1_C'
                    },
                    CONCRETE_POLISHED_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_DownCorner_Polished_8x2.Build_Ramp_DownCorner_Polished_8x2_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Polished_8x2_C'
                    },
                    CONCRETE_POLISHED_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Ramp_DownCorner_Polished_8x4.Build_Ramp_DownCorner_Polished_8x4_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Polished_8x4_C'
                    },
                    ASPHALT_8x1: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_DownCorner_Asphalt_8x1.Build_Ramp_DownCorner_Asphalt_8x1_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Asphalt_8x1_C'
                    },
                    ASPHALT_8x2: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_DownCorner_Asphalt_8x2.Build_Ramp_DownCorner_Asphalt_8x2_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Asphalt_8x2_C'
                    },
                    ASPHALT_8x4: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Ramp_DownCorner_Asphalt_8x4.Build_Ramp_DownCorner_Asphalt_8x4_C',
                        CLASS_NAME: 'Build_Ramp_DownCorner_Asphalt_8x4_C'
                    }
                },
                INVERTED: {
                    SINGLE: {
                        NORMAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x1.Build_RampInverted_8x1_C',
                            CLASS_NAME: 'Build_RampInverted_8x1_C'
                        },
                        NORMAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x2_01.Build_RampInverted_8x2_01_C',
                            CLASS_NAME: 'Build_RampInverted_8x1_C'
                        },
                        NORMAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_8x4_Inverted_01.Build_Ramp_8x4_Inverted_01_C',
                            CLASS_NAME: 'Build_RampInverted_8x1_C'
                        },
                        METAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_Metal_8x1.Build_InvertedRamp_Metal_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_Metal_8x1_C'
                        },
                        METAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_Metal_8x2.Build_InvertedRamp_Metal_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_Metal_8x2_C'
                        },
                        METAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_Metal_8x4.Build_InvertedRamp_Metal_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_Metal_8x4_C'
                        },
                        CONCRETE_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_Concrete_8x1.Build_InvertedRamp_Concrete_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_Concrete_8x1_C'
                        },
                        CONCRETE_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_Concrete_8x2.Build_InvertedRamp_Concrete_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_Concrete_8x2_C'
                        },
                        CONCRETE_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_Concrete_8x4.Build_InvertedRamp_Concrete_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_Concrete_8x4_C'
                        },
                        CONCRETE_POLISHED_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_Polished_8x1.Build_InvertedRamp_Polished_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_Polished_8x1_C'
                        },
                        CONCRETE_POLISHED_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_Polished_8x2.Build_InvertedRamp_Polished_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_Polished_8x2_C'
                        },
                        CONCRETE_POLISHED_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_Polished_8x4.Build_InvertedRamp_Polished_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_Polished_8x4_C'
                        },
                        ASPHALT_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_Asphalt_8x1.Build_InvertedRamp_Asphalt_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_Asphalt_8x1_C'
                        },
                        ASPHALT_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_Asphalt_8x2.Build_InvertedRamp_Asphalt_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_Asphalt_8x2_C'
                        },
                        ASPHALT_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_Asphalt_8x4.Build_InvertedRamp_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_Asphalt_8x4_C'
                        }
                    },
                    UCORNER: {
                        NORMAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x1_Corner_01.Build_RampInverted_8x1_Corner_01_C',
                            CLASS_NAME: 'Build_RampInverted_8x1_Corner_01_C'
                        },
                        NORMAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x2_Corner_01.Build_RampInverted_8x2_Corner_01_C',
                            CLASS_NAME: 'Build_RampInverted_8x2_Corner_01_C'
                        },
                        NORMAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x4_Corner_01.Build_RampInverted_8x4_Corner_01_C',
                            CLASS_NAME: 'Build_RampInverted_8x4_Corner_01_C'
                        },
                        CONCRETE_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_UCorner_Concrete_8x1.Build_InvertedRamp_UCorner_Concrete_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Concrete_8x1_C'
                        },
                        CONCRETE_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_UCorner_Concrete_8x2.Build_InvertedRamp_UCorner_Concrete_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Concrete_8x2_C'
                        },
                        CONCRETE_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_UCorner_Concrete_8x4.Build_InvertedRamp_UCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Concrete_8x4_C'
                        },
                        METAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_UCorner_Metal_8x1.Build_InvertedRamp_UCorner_Metal_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Metal_8x1_C'
                        },
                        METAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_UCorner_Metal_8x2.Build_InvertedRamp_UCorner_Metal_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Metal_8x2_C'
                        },
                        METAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_UCorner_Metal_8x4.Build_InvertedRamp_UCorner_Metal_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Metal_8x4_C'
                        },
                        CONCRETE_POLISHED_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_UCorner_Polished_8x1.Build_InvertedRamp_UCorner_Polished_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Polished_8x1_C'
                        },
                        CONCRETE_POLISHED_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_UCorner_Polished_8x2.Build_InvertedRamp_UCorner_Polished_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Polished_8x2_C'
                        },
                        CONCRETE_POLISHED_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_UCorner_Polished_8x4.Build_InvertedRamp_UCorner_Polished_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Polished_8x4_C'
                        },
                        ASPHALT_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_UCorner_Asphalt_8x1.Build_InvertedRamp_UCorner_Asphalt_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Asphalt_8x1_C'
                        },
                        ASPHALT_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_UCorner_Asphalt_8x2.Build_InvertedRamp_UCorner_Asphalt_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Asphalt_8x2_C'
                        },
                        ASPHALT_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_UCorner_Asphalt_8x4.Build_InvertedRamp_UCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_UCorner_Asphalt_8x4_C'
                        }
                    },
                    DCORNER: {
                        NORMAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x1_Corner_02.Build_RampInverted_8x1_Corner_02_C',
                            CLASS_NAME: 'Build_RampInverted_8x1_Corner_02_C'
                        },
                        NORMAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x2_Corner_02.Build_RampInverted_8x2_Corner_02_C',
                            CLASS_NAME: 'Build_RampInverted_8x2_Corner_02_C'
                        },
                        NORMAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_RampInverted_8x4_Corner_02.Build_RampInverted_8x4_Corner_02_C',
                            CLASS_NAME: 'Build_RampInverted_8x4_Corner_02_C'
                        },
                        CONCRETE_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_DCorner_Concrete_8x1.Build_InvertedRamp_DCorner_Concrete_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Concrete_8x1_C'
                        },
                        CONCRETE_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_DCorner_Concrete_8x2.Build_InvertedRamp_DCorner_Concrete_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Concrete_8x2_C'
                        },
                        CONCRETE_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_InvertedRamp_DCorner_Concrete_8x4.Build_InvertedRamp_DCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Concrete_8x4_C'
                        },
                        METAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_DCorner_Metal_8x1.Build_InvertedRamp_DCorner_Metal_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Metal_8x1_C'
                        },
                        METAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_DCorner_Metal_8x2.Build_InvertedRamp_DCorner_Metal_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Metal_8x2_C'
                        },
                        METAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_InvertedRamp_DCorner_Metal_8x4.Build_InvertedRamp_DCorner_Metal_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Metal_8x4_C'
                        },
                        CONCREtE_POLISHED_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_DCorner_Polished_8x1.Build_InvertedRamp_DCorner_Polished_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Polished_8x1_C'
                        },
                        CONCREtE_POLISHED_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_DCorner_Polished_8x2.Build_InvertedRamp_DCorner_Polished_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Polished_8x2_C'
                        },
                        CONCREtE_POLISHED_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_InvertedRamp_DCorner_Polished_8x4.Build_InvertedRamp_DCorner_Polished_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Polished_8x4_C'
                        },
                        ASPHALT_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_DCorner_Asphalt_8x1.Build_InvertedRamp_DCorner_Asphalt_8x1_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Asphalt_8x1_C'
                        },
                        ASPHALT_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_DCorner_Asphalt_8x2.Build_InvertedRamp_DCorner_Asphalt_8x2_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Asphalt_8x2_C'
                        },
                        ASPHALT_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_InvertedRamp_DCorner_Asphalt_8x4.Build_InvertedRamp_DCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_InvertedRamp_DCorner_Asphalt_8x4_C'
                        }
                    }
                }
            },
            PIPE: {
                HALF: {
                    QUARTER: {
                        NORMAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipe.Build_QuarterPipe_C',
                            CLASS_NAME: 'Build_QuarterPipe_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipe_Concrete_8x4.Build_QuarterPipe_Concrete_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipe_Concrete_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipe_Grip_8x4.Build_QuarterPipe_Grip_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipe_Grip_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipe_ConcretePolished_8x4.Build_QuarterPipe_ConcretePolished_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipe_ConcretePolished_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipe_Asphalt_8x4.Build_QuarterPipe_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipe_Asphalt_8x4_C'
                        }
                    },
                    QUARTER_INVERTED: {
                        NORMAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipe_02.Build_QuarterPipe_02_C',
                            CLASS_NAME: 'Build_QuarterPipe_02_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_DownQuarterPipe_Concrete_8x4.Build_DownQuarterPipe_Concrete_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipe_Concrete_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_DownQuarterPipe_Grip_8x4.Build_DownQuarterPipe_Grip_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipe_Grip_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_DownQuarterPipe_ConcretePolished_8x4.Build_DownQuarterPipe_ConcretePolished_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipe_ConcretePolished_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_DownQuarterPipe_Asphalt_8x4.Build_DownQuarterPipe_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipe_Asphalt_8x4_C'
                        }
                    },
                    CORNER: {
                        NORMAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipeCorner_01.Build_QuarterPipeCorner_01_C',
                            CLASS_NAME: 'Build_QuarterPipeCorner_01_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeInCorner_Concrete_8x4.Build_QuarterPipeInCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeInCorner_Concrete_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeInCorner_Grip_8x4.Build_QuarterPipeInCorner_Grip_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeInCorner_Grip_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeInCorner_ConcretePolished_8x4.Build_QuarterPipeInCorner_ConcretePolished_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeInCorner_ConcretePolished_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeInCorner_Asphalt_8x4.Build_QuarterPipeInCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeInCorner_Asphalt_8x4_C'
                        }
                    },
                    CORNER_INVERTED: {
                        NORMAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipeCorner_02.Build_QuarterPipeCorner_02_C',
                            CLASS_NAME: 'Build_QuarterPipeCorner_02_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_DownQuarterPipeInCorner_Concrete_8x4.Build_DownQuarterPipeInCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeInCorner_Concrete_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_DownQuarterPipeInCorner_ConcretePolished_8x4.Build_DownQuarterPipeInCorner_ConcretePolished_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeInCorner_ConcretePolished_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_DownQuarterPipeInCorner_Asphalt_8x4.Build_DownQuarterPipeInCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeInCorner_Asphalt_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_DownQuarterPipeInCorner_Grip_8x4.Build_DownQuarterPipeInCorner_Grip_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeInCorner_Grip_8x4_C'
                        }
                    },
                },
                FULL: {
                    CORNER: {
                        QUARTER_PIPE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipeCorner_03.Build_QuarterPipeCorner_03_C',
                            CLASS_NAME: 'Build_QuarterPipeCorner_03_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeOutCorner_Concrete_8x4.Build_QuarterPipeOutCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeOutCorner_Concrete_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeOutCorner_Grip_8x4.Build_QuarterPipeOutCorner_Grip_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeOutCorner_Grip_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeOutCorner_ConcretePolished_8x4.Build_QuarterPipeOutCorner_ConcretePolished_8x4_C',
                            CLASs_NAME: 'Build_QuarterPipeOutCorner_ConcretePolished_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeOutCorner_Asphalt_8x4.Build_QuarterPipeOutCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeOutCorner_Asphalt_8x4_C'
                        }
                    },
                    DOWN_QUARTER_PIPE: {
                        NORMAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_QuarterPipeCorner_04.Build_QuarterPipeCorner_04_C',
                            CLASS_NAME: 'Build_QuarterPipeCorner_04_C'
                        },
                        CONCRETE: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_DownQuarterPipeOutCorner_Concrete_8x4.Build_DownQuarterPipeOutCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeOutCorner_Concrete_8x4_C'
                        },
                        CONCRETE_POLISHED: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_DownQuarterPipeOutCorner_ConcretePolished_8x4.Build_DownQuarterPipeOutCorner_ConcretePolished_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeOutCorner_ConcretePolished_8x4_C'
                        },
                        METAL: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_DownQuarterPipeOutCorner_Grip_8x4.Build_DownQuarterPipeOutCorner_Grip_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeOutCorner_Grip_8x4_C'
                        },
                        ASPHALT: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_DownQuarterPipeOutCorner_Asphalt_8x4.Build_DownQuarterPipeOutCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_DownQuarterPipeOutCorner_Asphalt_8x4_C'
                        }
                    },
                    MIDDLE_IN: {
                        NORMAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleInCorner_Ficsit_8x1.Build_QuarterPipeMiddleInCorner_Ficsit_8x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Ficsit_8x1_C'
                        },
                        NORMAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleInCorner_Ficsit_8x2.Build_QuarterPipeMiddleInCorner_Ficsit_8x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Ficsit_8x2_C'
                        },
                        NORMAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleInCorner_Ficsit_8x4.Build_QuarterPipeMiddleInCorner_Ficsit_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Ficsit_8x4_C'
                        },
                        CONCRETE_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleInCorner_Concrete_8x1.Build_QuarterPipeMiddleInCorner_Concrete_8x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Concrete_8x1_C'
                        },
                        CONCRETE_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleInCorner_Concrete_8x2.Build_QuarterPipeMiddleInCorner_Concrete_8x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Concrete_8x2_C'
                        },
                        CONCRETE_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleInCorner_Concrete_8x4.Build_QuarterPipeMiddleInCorner_Concrete_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Concrete_8x4_C'
                        },
                        METAL_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleInCorner_Grip_8x1.Build_QuarterPipeMiddleInCorner_Grip_8x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Grip_8x1_C'
                        },
                        METAL_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleInCorner_Grip_8x2.Build_QuarterPipeMiddleInCorner_Grip_8x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Grip_8x2_C'
                        },
                        METAL_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleInCorner_Grip_8x4.Build_QuarterPipeMiddleInCorner_Grip_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Grip_8x4_C'
                        },
                        CONCRETE_POLISHED_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x1.Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x1_C'
                        },
                        CONCRETE_POLISHED_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x2.Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x2_C'
                        },
                        CONCRETE_POLISHED_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x4.Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_PolishedConcrete_8x4_C'
                        },
                        ASPHALT_8x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleInCorner_Asphalt_8x1.Build_QuarterPipeMiddleInCorner_Asphalt_8x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Asphalt_8x1_C'
                        },
                        ASPHALT_8x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleInCorner_Asphalt_8x2.Build_QuarterPipeMiddleInCorner_Asphalt_8x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Asphalt_8x2_C'
                        },
                        ASPHALT_8x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleInCorner_Asphalt_8x4.Build_QuarterPipeMiddleInCorner_Asphalt_8x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleInCorner_Asphalt_8x4_C'
                        },
                    },
                    QUARTER_MIDDLE_OUT: {
                        NORMAL_4x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleOutCorner_Ficsit_4x1.Build_QuarterPipeMiddleOutCorner_Ficsit_4x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Ficsit_4x1_C'
                        },
                        NORMAL_4x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleOutCorner_Ficsit_4x2.Build_QuarterPipeMiddleOutCorner_Ficsit_4x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Ficsit_4x2_C'
                        },
                        NORMAL_4x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_QuarterPipeMiddleOutCorner_Ficsit_4x4.Build_QuarterPipeMiddleOutCorner_Ficsit_4x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Ficsit_4x4_C'
                        },
                        CONCRETE_4x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleOutCorner_Concrete_4x1.Build_QuarterPipeMiddleOutCorner_Concrete_4x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Concrete_4x1_C'
                        },
                        CONCRETE_4x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleOutCorner_Concrete_4x2.Build_QuarterPipeMiddleOutCorner_Concrete_4x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Concrete_4x2_C'
                        },
                        CONCRETE_4x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_QuarterPipeMiddleOutCorner_Concrete_4x4.Build_QuarterPipeMiddleOutCorner_Concrete_4x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Concrete_4x4_C'
                        },
                        METAL_4x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleOutCorner_Grip_4x1.Build_QuarterPipeMiddleOutCorner_Grip_4x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Grip_4x1_C'
                        },
                        METAL_4x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleOutCorner_Grip_4x2.Build_QuarterPipeMiddleOutCorner_Grip_4x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Grip_4x2_C'
                        },
                        METAL_4x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_QuarterPipeMiddleOutCorner_Grip_4x4.Build_QuarterPipeMiddleOutCorner_Grip_4x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Grip_4x4_C'
                        },
                        CONCRETE_POLISHED_4x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x1.Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x1_C'
                        },
                        CONCRETE_POLISHED_4x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x2.Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x2_C'
                        },
                        CONCRETE_POLISHED_4x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x4.Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_PolishedConcrete_4x4_C'
                        },
                        ASPHALT_4x1: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleOutCorner_Asphalt_4x1.Build_QuarterPipeMiddleOutCorner_Asphalt_4x1_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Asphalt_4x1_C'
                        },
                        ASPHALT_4x2: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleOutCorner_Asphalt_4x2.Build_QuarterPipeMiddleOutCorner_Asphalt_4x2_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Asphalt_4x2_C'
                        },
                        ASPHALT_4x4: {
                            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_QuarterPipeMiddleOutCorner_Asphalt_4x4.Build_QuarterPipeMiddleOutCorner_Asphalt_4x4_C',
                            CLASS_NAME: 'Build_QuarterPipeMiddleOutCorner_Asphalt_4x4_C'
                        }
                    }
                }
            },
            FRAME: {
                FLAT: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_Foundation_Frame_01.Build_Foundation_Frame_01_C',
                    CLASS_NAME: 'Build_Foundation_Frame_01_C'
                },
                FLAT_THIN: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_Flat_Frame_01.Build_Flat_Frame_01_C',
                    CLASS_NAME: 'Build_Flat_Frame_01_C'
                },
                RAMP: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Frame_01.Build_Ramp_Frame_01_C',
                    CLASS_NAME: 'Build_Ramp_Frame_01_C'
                },
                INVERTED_RAMP: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ramp/Build_Ramp_Frame_Inverted_01.Build_Ramp_Frame_Inverted_01_C',
                    CLASS_NAME: 'Build_Ramp_Frame_Inverted_01_C'
                }
            },
            STAIRS: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_Stair_FicsitSet_8x1_01.Build_Stair_FicsitSet_8x1_01_C',
                    CLASS_NAME: 'Build_Stair_FicsitSet_8x1_01_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_Stair_FicsitSet_8x2_01.Build_Stair_FicsitSet_8x2_01_C',
                    CLASS_NAME: 'Build_Stair_FicsitSet_8x2_01_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/FicsitSet/Build_Stair_FicsitSet_8x4_01.Build_Stair_FicsitSet_8x4_01_C',
                    CLASS_NAME: 'Build_Stair_FicsitSet_8x4_01_C'
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Stair_Concrete_8x1.Build_Stair_Concrete_8x1_C',
                    CLASS_NAME: 'Build_Stair_Concrete_8x1_C'
                },
                CONCRETE_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Stair_Concrete_8x2.Build_Stair_Concrete_8x2_C',
                    CLASS_NAME: 'Build_Stair_Concrete_8x2_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/ConcreteSet/Build_Stair_Concrete_8x4.Build_Stair_Concrete_8x4_C',
                    CLASS_NAME: 'Build_Stair_Concrete_8x4_C'
                },
                CONCRETE_POLISHED_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Stair_PolishedConcrete_8x1.Build_Stair_PolishedConcrete_8x1_C',
                    CLASS_NAME: 'Build_Stair_PolishedConcrete_8x1_C'
                },
                CONCRETE_POLISHED_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Stair_PolishedConcrete_8x2.Build_Stair_PolishedConcrete_8x2_C',
                    CLASS_NAME: 'Build_Stair_PolishedConcrete_8x2_C'
                },
                CONCRETE_POLISHED_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/PolishedConcreteSet/Build_Stair_PolishedConcrete_8x4.Build_Stair_PolishedConcrete_8x4_C',
                    CLASS_NAME: 'Build_Stair_PolishedConcrete_8x4_C'
                },
                ASPHALT_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Stair_Asphalt_8x1.Build_Stair_Asphalt_8x1_C',
                    CLASS_NAME: 'Build_Stair_Asphalt_8x1_C'
                },
                ASPHALT_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Stair_Asphalt_8x2.Build_Stair_Asphalt_8x2_C',
                    CLASS_NAME: 'Build_Stair_Asphalt_8x2_C'
                },
                ASPHALT_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/AsphaltSet/Build_Stair_Asphalt_8x4.Build_Stair_Asphalt_8x4_C',
                    CLASS_NAME: 'Build_Stair_Asphalt_8x4_C'
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Stair_GripMetal_8x1.Build_Stair_GripMetal_8x1_C',
                    CLASS_NAME: 'Build_Stair_GripMetal_8x1_C'
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Stair_GripMetal_8x2.Build_Stair_GripMetal_8x2_C',
                    CLASS_NAME: 'Build_Stair_GripMetal_8x2_C'
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/GripMetal/Build_Stair_GripMetal_8x4.Build_Stair_GripMetal_8x4_C',
                    CLASS_NAME: 'Build_Stair_GripMetal_8x4_C'
                },
            }
        },
        WALL: {
            SOLID: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_8x1.Build_Wall_Orange_8x1_C',
                    CLASS_NAME: 'Build_Wall_Orange_8x1_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_8x4_01.Build_Wall_8x4_01_C',
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Walls/Recipe_Wall_8x4_01.Recipe_Wall_8x4_01_C',
                    CLASS_NAME: 'Build_Wall_8x4_01_C',
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x1.Build_Wall_Concrete_8x1_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x1_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4.Build_Wall_Concrete_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_C'
                },
                STEEL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x1.Build_SteelWall_8x1_C',
                    CLASS_NAME: 'Build_SteelWall_8x1_C'
                },
                STEEL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_8x4_02.Build_Wall_8x4_02_C',
                    CLASS_NAME: 'Build_Wall_8x4_02_C'
                },
            },
            CORNER: {
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_8x4_Corner_01.Build_Wall_Orange_8x4_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Orange_8x4_Corner_01_C'
                },
                NORMAL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_8x8_Corner_01.Build_Wall_Orange_8x8_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Orange_8x8_Corner_01_C'
                },
                NORMAL_8x4_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_8x4_Corner_02.Build_Wall_Orange_8x4_Corner_02_C',
                    CLASS_NAME: 'Build_Wall_Orange_8x4_Corner_02_C'
                },
                NORMAL_8x8_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_8x8_Corner_02.Build_Wall_Orange_8x8_Corner_02_C',
                    CLASS_NAME: 'Build_Wall_Orange_8x8_Corner_02_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Corner_01.Build_Wall_Concrete_8x4_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Corner_01_C'
                },
                CONCRETE_8x4_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Corner_2.Build_Wall_Concrete_8x4_Corner_2_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Corner_2_C'
                },
                CONCRETE_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x8_Corner_01.Build_Wall_Concrete_8x8_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x8_Corner_01_C'
                },
                CONCRETE_8x8_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x8_Corner_2.Build_Wall_Concrete_8x8_Corner_2_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x8_Corner_2_C'
                },
                STEEL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_Wall_Steel_8x4_Corner_01.Build_Wall_Steel_8x4_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Steel_8x4_Corner_01_C'
                },
                STEEL_8x4_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_Wall_Steel_8x4_Corner_2.Build_Wall_Steel_8x4_Corner_2_C',
                    CLASS_NAME: 'Build_Wall_Steel_8x4_Corner_2_C'
                },
                STEEL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_Wall_Steel_8x8_Corner_01.Build_Wall_Steel_8x8_Corner_01_C',
                    CLASS_NAME: 'Build_Wall_Steel_8x8_Corner_01_C'
                },
                STEEL_8x8_2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_Wall_Steel_8x8_Corner_2.Build_Wall_Steel_8x8_Corner_2_C',
                    CLASS_NAME: 'Build_Wall_Steel_8x8_Corner_2_C'
                }
            },
            GATE: {
                NORMAL_WALL_GATE: {
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Walls/Recipe_Wall_Gate_8x4_01.Recipe_Wall_Gate_8x4_01_C',
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Gate_8x4_01.Build_Wall_Gate_8x4_01_C',
                    CLASS_NAME: 'Build_Wall_Gate_8x4_01_C',
                },
                AUTOMATED: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Doors/Build_Gate_Automated_8x4.Build_Gate_Automated_8x4_C',
                    CLASS_NAME: 'Build_Gate_Automated_8x4_C'
                },
                CONCRETE_WALL_GATE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Gate_8x4.Build_Wall_Concrete_Gate_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Gate_8x4_C'
                },
                STEEL_WALL_GATE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x4_Gate_01.Build_SteelWall_8x4_Gate_01_C',
                    CLASS_NAME: 'Build_SteelWall_8x4_Gate_01_C'
                },
                BIG_GARAGE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Doors/Build_BigGarageDoor_16x8.Build_BigGarageDoor_16x8_C',
                    CLASS_NAME: 'Build_BigGarageDoor_16x8_C'
                }
            },
            CONVEYOR: {
                ONE_HOLE: {
                    NORMAL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_03.Build_Wall_Conveyor_8x4_03_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_03_C'
                    },
                    CONCRETE: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_ConveyorHole_01.Build_Wall_Concrete_8x4_ConveyorHole_01_C',
                        CLASS_NAME: 'Build_Wall_Concrete_8x4_ConveyorHole_01_C'
                    },
                    STEEL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_03_Steel.Build_Wall_Conveyor_8x4_03_Steel_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_03_Steel_C'
                    }
                },
                TWO_HOLES: {
                    NORMAL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_02.Build_Wall_Conveyor_8x4_02_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_02_C'
                    },
                    CONCRETE: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_ConveyorHole_02.Build_Wall_Concrete_8x4_ConveyorHole_02_C',
                        CLASS_NAME: 'Build_Wall_Concrete_8x4_ConveyorHole_02_C'
                    },
                    STEEL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_02_Steel.Build_Wall_Conveyor_8x4_02_Steel_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_02_Steel_C'
                    }
                },
                THREE_HOLES: {
                    NORMAL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_01.Build_Wall_Conveyor_8x4_01_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_01_C'
                    },
                    CONCRETE: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_ConveyorHole_03.Build_Wall_Concrete_8x4_ConveyorHole_03_C',
                        CLASS_NAME: 'Build_Wall_Concrete_8x4_ConveyorHole_03_C'
                    },
                    STEEL: {
                        TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Conveyor_8x4_01_Steel.Build_Wall_Conveyor_8x4_01_Steel_C',
                        CLASS_NAME: 'Build_Wall_Conveyor_8x4_01_Steel_C'
                    }
                }
            },
            DOOR: {
                NORMAL_CENTER: {
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Walls/Recipe_Wall_Door_8x4_01.Recipe_Wall_Door_8x4_01_C',
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Door_8x4_01.Build_Wall_Door_8x4_01_C',
                    CLASS_NAME: 'Build_Wall_Door_8x4_01_C',
                },
                NORMAL_SIDE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Door_8x4_03.Build_Wall_Door_8x4_03_C',
                    CLASS_NAME: 'Build_Wall_Door_8x4_03_C'
                },
                CONCRETE_CENTER: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_CDoor_8x4.Build_Wall_Concrete_CDoor_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_CDoor_8x4_C'
                },
                CONCRETE_SIDE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_SDoor_8x4.Build_Wall_Concrete_SDoor_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_SDoor_8x4_C'
                },
                STEEL_SIDE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Door_8x4_03_Steel.Build_Wall_Door_8x4_03_Steel_C',
                    CLASS_NAME: 'Build_Wall_Door_8x4_03_Steel_C'
                },
                STEEL_CENTER: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Door_8x4_01_Steel.Build_Wall_Door_8x4_01_Steel_C',
                    CLASS_NAME: 'Build_Wall_Door_8x4_01_Steel_C'
                }
            },
            WINDOW: {
                THIN_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_Thin_8x4_01.Build_Wall_Window_Thin_8x4_01_C',
                    CLASS_NAME: 'Build_Wall_Window_Thin_8x4_01_C'
                },
                THIN_02: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_Thin_8x4_01.Build_Wall_Window_Thin_8x4_02_C',
                    CLASS_NAME: 'Build_Wall_Window_Thin_8x4_02_C'
                },
                NORMAL_8x4_01: {
                    RECIPE: '/Game/FactoryGame/Recipes/Buildings/Walls/Recipe_Wall_Window_8x4_01.Recipe_Wall_Window_8x4_01_C',
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_01.Build_Wall_Window_8x4_01_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_01_C',
                },
                NORMAL_8x4_02: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_02.Build_Wall_Window_8x4_02_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_02_C',
                },
                NORMAL_8x4_03: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_03.Build_Wall_Window_8x4_03_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_03_C'
                },
                NORMAL_8x4_04: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_04.Build_Wall_Window_8x4_04_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_04_C'
                },
                NORMAL_8x4_05: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_05.Build_Wall_Window_8x4_05_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_05_C'
                },
                NORMAL_8x4_06: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_06.Build_Wall_Window_8x4_06_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_06_C'
                },
                NORMAL_8x4_07: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Window_8x4_07.Build_Wall_Window_8x4_07_C',
                    CLASS_NAME: 'Build_Wall_Window_8x4_07_C'
                },
                CONCRETE_8x4_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Window_01.Build_Wall_Concrete_8x4_Window_01_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Window_01_C'
                },
                CONCRETE_8x4_02: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Window_02.Build_Wall_Concrete_8x4_Window_02_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Window_02_C'
                },
                CONCRETE_8x4_03: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Window_03.Build_Wall_Concrete_8x4_Window_03_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Window_03_C'
                },
                CONCRETE_8x4_04: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_8x4_Window_04.Build_Wall_Concrete_8x4_Window_04_C',
                    CLASS_NAME: 'Build_Wall_Concrete_8x4_Window_04_C'
                },
                STEEL_8x4_01: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x4_Window_01.Build_SteelWall_8x4_Window_01_C',
                    CLASS_NAME: 'Build_SteelWall_8x4_Window_01_C'
                },
                STEEL_8x4_02: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x4_Window_02.Build_SteelWall_8x4_Window_02_C',
                    CLASS_NAME: 'Build_SteelWall_8x4_Window_02_C'
                },
                STEEL_8x4_03: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x4_Window_03.Build_SteelWall_8x4_Window_03_C',
                    CLASS_NAME: 'Build_SteelWall_8x4_Window_03_C'
                },
                STEEL_8x4_04: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_8x4_Window_04.Build_SteelWall_8x4_Window_04_C',
                    CLASS_NAME: 'Build_SteelWall_8x4_Window_04_C'
                }
            },
            TRIS: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Tris_8x1.Build_Wall_Orange_Tris_8x1_C',
                    CLASS_NAME: 'Build_Wall_Orange_Tris_8x1_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Tris_8x2.Build_Wall_Orange_Tris_8x2_C',
                    CLASS_NAME: 'Build_Wall_Orange_Tris_8x2_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Tris_8x4.Build_Wall_Orange_Tris_8x4_C',
                    CLASS_NAME: 'Build_Wall_Orange_Tris_8x4_C'
                },
                NORMAL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Tris_8x8.Build_Wall_Orange_Tris_8x8_C',
                    CLASS_NAME: 'Build_Wall_Orange_Tris_8x8_C'
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Tris_8x1.Build_Wall_Concrete_Tris_8x1_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Tris_8x1_C'
                },
                CONCRETE_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Tris_8x2.Build_Wall_Concrete_Tris_8x2_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Tris_8x2_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Tris_8x4.Build_Wall_Concrete_Tris_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Tris_8x4_C'
                },
                CONCRETE_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Tris_8x8.Build_Wall_Concrete_Tris_8x8_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Tris_8x8_C'
                },
                STEEL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_Tris_8x1.Build_SteelWall_Tris_8x1_C',
                    CLASS_NAME: 'Build_SteelWall_Tris_8x1_C'
                },
                STEEL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_Tris_8x2.Build_SteelWall_Tris_8x2_C',
                    CLASS_NAME: 'Build_SteelWall_Tris_8x2_C'
                },
                STEEL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_Tris_8x4.Build_SteelWall_Tris_8x4_C',
                    CLASS_NAME: 'Build_SteelWall_Tris_8x4_C'
                },
                STEEL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_Tris_8x8.Build_SteelWall_Tris_8x8_C',
                    CLASS_NAME: 'Build_SteelWall_Tris_8x8_C'
                }
            },
            FLIP_TRIS: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_FlipTris_8x1.Build_Wall_Orange_FlipTris_8x1_C',
                    CLASS_NAME: 'Build_Wall_Orange_FlipTris_8x1_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_FlipTris_8x2.Build_Wall_Orange_FlipTris_8x2_C',
                    CLASS_NAME: 'Build_Wall_Orange_FlipTris_8x2_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_FlipTris_8x4.Build_Wall_Orange_FlipTris_8x4_C',
                    CLASS_NAME: 'Build_Wall_Orange_FlipTris_8x4_C'
                },
                NORMAL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_FlipTris_8x8.Build_Wall_Orange_FlipTris_8x8_C',
                    CLASS_NAME: 'Build_Wall_Orange_FlipTris_8x8_C'
                },
                CONCRETE_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_FlipTris_8x1.Build_Wall_Concrete_FlipTris_8x1_C',
                    CLASS_NAME: 'Build_Wall_Concrete_FlipTris_8x1_C'
                },
                CONCRETE_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_FlipTris_8x2.Build_Wall_Concrete_FlipTris_8x2_C',
                    CLASS_NAME: 'Build_Wall_Concrete_FlipTris_8x2_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_FlipTris_8x4.Build_Wall_Concrete_FlipTris_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_FlipTris_8x4_C'
                },
                CONCRETE_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_FlipTris_8x8.Build_Wall_Concrete_FlipTris_8x8_C',
                    CLASS_NAME: 'Build_Wall_Concrete_FlipTris_8x8_C'
                },
                STEEL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_FlipTris_8x8.Build_SteelWall_FlipTris_8x1_C',
                    CLASS_NAME: 'Build_SteelWall_FlipTris_8x1_C'
                },
                STEEL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_FlipTris_8x8.Build_SteelWall_FlipTris_8x2_C',
                    CLASS_NAME: 'Build_SteelWall_FlipTris_8x2_C'
                },
                STEEL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_FlipTris_8x8.Build_SteelWall_FlipTris_8x4_C',
                    CLASS_NAME: 'Build_SteelWall_FlipTris_8x4_C'
                },
                STEEL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_SteelWall_FlipTris_8x8.Build_SteelWall_FlipTris_8x8_C',
                    CLASS_NAME: 'Build_SteelWall_FlipTris_8x8_C'
                }
            },
            SLANTED: {
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Angular_8x4.Build_Wall_Orange_Angular_8x4_C',
                    CLASS_NAME: 'Build_Wall_Orange_Angular_8x4_C'
                },
                NORMAL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/FicsitWallSet/Build_Wall_Orange_Angular_8x8.Build_Wall_Orange_Angular_8x8_C',
                    CLASS_NAME: 'Build_Wall_Orange_Angular_8x8_C'
                },
                CONCRETE_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Angular_8x4.Build_Wall_Concrete_Angular_8x4_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Angular_8x4_C'
                },
                CONCRETE_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/ConcreteWallSet/Build_Wall_Concrete_Angular_8x8.Build_Wall_Concrete_Angular_8x8_C',
                    CLASS_NAME: 'Build_Wall_Concrete_Angular_8x8_C'
                },
                STEEL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_WallSet_Steel_Angular_8x4.Build_WallSet_Steel_Angular_8x4_C',
                    CLASS_NAME: 'Build_WallSet_Steel_Angular_8x4_C'
                },
                STEEL_8x8: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/SteelWallSet/Build_WallSet_Steel_Angular_8x8.Build_WallSet_Steel_Angular_8x8_C',
                    CLASS_NAME: 'Build_WallSet_Steel_Angular_8x8_C'
                }
            },
            FRAME: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Wall/Build_Wall_Frame_01.Build_Wall_Frame_01_C',
                CLASS_NAME: 'Build_Wall_Frame_01_C'
            }
        },
        ROOF: {
            OUTCORNER: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_OutCorner_01.Build_Roof_Orange_OutCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Orange_OutCorner_01_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_OutCorner_02.Build_Roof_Orange_OutCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Orange_OutCorner_02_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_OutCorner_03.Build_Roof_Orange_OutCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Orange_OutCorner_03_C'
                },
                TAR_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_OutCorner_01.Build_Roof_Tar_OutCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Tar_OutCorner_01_C'
                },
                TAR_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_OutCorner_02.Build_Roof_Tar_OutCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Tar_OutCorner_02_C'
                },
                TAR_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_OutCorner_03.Build_Roof_Tar_OutCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Tar_OutCorner_03_C'
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_OutCorner_01.Build_Roof_Metal_OutCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Metal_OutCorner_01_C'
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_OutCorner_02.Build_Roof_Metal_OutCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Metal_OutCorner_02_C'
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_OutCorner_03.Build_Roof_Metal_OutCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Metal_OutCorner_03_C'
                },
                GLASS_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_OutCorner_01.Build_Roof_Window_OutCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Window_OutCorner_01_C'
                },
                GLASS_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_OutCorner_02.Build_Roof_Window_OutCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Window_OutCorner_02_C'
                },
                GLASS_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_OutCorner_03.Build_Roof_Window_OutCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Window_OutCorner_03_C'
                }
            },
            INCORNER: {
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_InCorner_01.Build_Roof_Orange_InCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Orange_InCorner_01_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_InCorner_02.Build_Roof_Orange_InCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Orange_InCorner_02_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_InCorner_03.Build_Roof_Orange_InCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Orange_InCorner_03_C'
                },
                TAR_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_InCorner_01.Build_Roof_Tar_InCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Tar_InCorner_01_C'
                },
                TAR_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_InCorner_02.Build_Roof_Tar_InCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Tar_InCorner_02_C'
                },
                TAR_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_InCorner_03.Build_Roof_Tar_InCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Tar_InCorner_03_C'
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_InCorner_01.Build_Roof_Metal_InCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Metal_InCorner_01_C'
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_InCorner_02.Build_Roof_Metal_InCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Metal_InCorner_02_C'
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Metal_InCorner_03.Build_Roof_Metal_InCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Metal_InCorner_03_C'
                },
                GLASS_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_InCorner_01.Build_Roof_Window_InCorner_01_C',
                    CLASS_NAME: 'Build_Roof_Window_InCorner_01_C'
                },
                GLASS_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_InCorner_02.Build_Roof_Window_InCorner_02_C',
                    CLASS_NAME: 'Build_Roof_Window_InCorner_02_C'
                },
                GLASS_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_InCorner_03.Build_Roof_Window_InCorner_03_C',
                    CLASS_NAME: 'Build_Roof_Window_InCorner_03_C'
                }
            },
            SLANTED: {
                NORMAL_8x0: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_01.Build_Roof_Orange_01_C',
                    CLASS_NAME: 'Build_Roof_Orange_01_C'
                },
                NORMAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_02.Build_Roof_Orange_02_C',
                    CLASS_NAME: 'Build_Roof_Orange_02_C'
                },
                NORMAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_03.Build_Roof_Orange_03_C',
                    CLASS_NAME: 'Build_Roof_Orange_03_C'
                },
                NORMAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Orange_04.Build_Roof_Orange_04_C',
                    CLASS_NAME: 'Build_Roof_Orange_04_C'
                },
                TAR_8x0: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_01.Build_Roof_Tar_01_C',
                    CLASS_NAME: 'Build_Roof_Tar_01_C'
                },
                TAR_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_02.Build_Roof_Tar_02_C',
                    CLASS_NAME: 'Build_Roof_Tar_02_C'
                },
                TAR_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_03.Build_Roof_Tar_03_C',
                    CLASS_NAME: 'Build_Roof_Tar_03_C'
                },
                TAR_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Tar_04.Build_Roof_Tar_04_C',
                    CLASS_NAME: 'Build_Roof_Tar_04_C'
                },
                METAL_8x0: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_A_01.Build_Roof_A_01_C',
                    CLASS_NAME: 'Build_Roof_A_01_C'
                },
                METAL_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_A_02.Build_Roof_A_02_C',
                    CLASS_NAME: 'Build_Roof_A_02_C'
                },
                METAL_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_A_03.Build_Roof_A_03_C',
                    CLASS_NAME: 'Build_Roof_A_03_C'
                },
                METAL_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_A_04.Build_Roof_A_04_C',
                    CLASS_NAME: 'Build_Roof_A_04_C'
                },
                GLASS_8x0: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_01.Build_Roof_Window_01_C',
                    CLASS_NAME: 'Build_Roof_Window_01_C'
                },
                GLASS_8x1: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_02.Build_Roof_Window_02_C',
                    CLASS_NAME: 'Build_Roof_Window_02_C'
                },
                GLASS_8x2: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_03.Build_Roof_Window_03_C',
                    CLASS_NAME: 'Build_Roof_Window_03_C'
                },
                GLASS_8x4: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Roof/Build_Roof_Window_04.Build_Roof_Window_04_C',
                    CLASS_NAME: 'Build_Roof_Window_04_C'
                }
            }
        },
        CATWALK: {
            STRAIGHT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkStraight.Build_CatwalkStraight_C',
                CLASS_NAME: 'Build_CatwalkStraight_C'
            },
            CORNER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkCorner.Build_CatwalkCorner_C',
                CLASS_NAME: 'Build_CatwalkCorner_C'
            },
            T_SECTION: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkT.Build_CatwalkT_C',
                CLASS_NAME: 'Build_CatwalkT_C'
            },
            RAMP: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkRamp.Build_CatwalkRamp_C',
                CLASS_NAME: 'Build_CatwalkRamp_C'
            },
            STAIRS: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkStairs.Build_CatwalkStairs_C',
                CLASS_NAME: 'Build_CatwalkStairs_C'
            },
            CROSSING: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Catwalk/Build_CatwalkCross.Build_CatwalkCross_C',
                CLASS_NAME: 'Build_CatwalkCross_C'
            }
        },
        WALKWAY: {
            STRAIGHT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Walkway/Build_WalkwayStraight.Build_WalkwayStraight_C',
                CLASS_NAME: 'Build_WalkwayStraight_C'
            },
            T_RUN: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Walkway/Build_WalkwayTrun.Build_WalkwayTrun_C',
                CLASS_NAME: 'Build_WalkwayTrun_C'
            },
            T_WALKWAY: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Walkway/Build_WalkwayT.Build_WalkwayT_C',
                CLASS_NAME: 'Build_WalkwayT_C'
            },
            CROSS: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Walkway/Build_WalkwayCross.Build_WalkwayCross_C',
                CLASS_NAME: 'Build_WalkwayCross_C'
            },
            RAMP: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Walkway/Build_WalkwayRamp.Build_WalkwayRamp_C',
                CLASS_NAME: 'Build_WalkwayRamp_C'
            }
        },
        RAILING: {
            FENCE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Fence/Build_Fence_01.Build_Fence_01_C',
                CLASS_NAME: 'Build_Fence_01_C'
            },
            RAILING: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Fence/Build_Railing_01.Build_Railing_01_C',
                CLASS_NAME: 'Build_Railing_01_C'
            },
            BARRIER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Fence/Build_Concrete_Barrier_01.Build_Concrete_Barrier_01_C',
                CLASS_NAME: 'Build_Concrete_Barrier_01_C'
            },
            BARRIER_LOW: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Barrier/Build_Barrier_Low_01.Build_Barrier_Low_01_C',
                CLASS_NAME: 'Build_Barrier_Low_01_C'
            },
            BARRIER_TALL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Barrier/Build_Barrier_Tall_01.Build_Barrier_Tall_01_C',
                CLASS_NAME: 'Build_Barrier_Tall_01_C'
            },
            TARPFENCE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/TarpFence/Build_TarpFence.Build_TarpFence_C',
                CLASS_NAME: 'Build_TarpFence_C'
            },
            CHAIN_LINK_FENCE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/TarpFence/Build_ChainLinkFence.Build_ChainLinkFence_C',
                CLASS_NAME: 'Build_ChainLinkFence_C'
            },
            BARRIER_CORNER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Fence/Build_Barrier_Corner.Build_Barrier_Corner_C',
                CLASS_NAME: 'Build_Barrier_Corner_C'
            }
        },
        WORKSHOP: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Workshop/Build_Workshop.Build_Workshop_C',
            CLASS_NAME: 'Build_Workshop_C'
        },
        LADDER: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Ladder/Build_Ladder.Build_Ladder_C',
            CLASS_NAME: 'Build_Ladder_C'
        },
        PILLAR: {
            BASE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_PillarBase.Build_PillarBase_C',
                CLASS_NAME: 'Build_PillarBase_C'
            },
            BASE_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Pillars/Build_PillarBase_Small.Build_PillarBase_Small_C',
                CLASS_NAME: 'Build_PillarBase_Small_C'
            },
            MIDDLE_METAL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_PillarMiddle.Build_PillarMiddle_C',
                CLASS_NAME: 'Build_PillarMiddle_C'
            },
            MIDDLE_CONCRETE: {
                TYPA_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_PillarMiddle_Concrete.Build_PillarMiddle_Concrete_C',
                CLASS_NAME: 'Build_PillarMiddle_Concrete_C'
            },
            MIDDLE_FRAME: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Foundation/Build_PillarMiddle_Frame.Build_PillarMiddle_Frame_C',
                CLASS_NAME: 'Build_PillarMiddle_Frame_C'
            },
            SMALL_METAL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Pillars/Build_Pillar_Small_Metal.Build_Pillar_Small_Metal_C',
                CLASS_NAME: 'Build_Pillar_Small_Metal_C'
            },
            SMALL_CONCRETE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Pillars/Build_Pillar_Small_Concrete.Build_Pillar_Small_Concrete_C',
                CLASS_NAME: 'Build_Pillar_Small_Concrete_C'
            },
            SMALL_FRAME: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Pillars/Build_Pillar_Small_Frame.Build_Pillar_Small_Frame_C',
                CLASS_NAME: 'Build_Pillar_Small_Frame_C'
            },
        },
        BEAM: {
            PAINTED: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Painted.Build_Beam_Painted_C',
                CLASS_NAME: 'Build_Beam_Painted_C',
                RECIPE: '/Game/FactoryGame/Prototype/Buildable/Beams/Recipe_Beam_Painted.Recipe_Beam_Painted_C'
            },
            METAL: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam.Build_Beam_C',
                CLASS_NAME: 'Build_Beam_C',
                RECIPE: '/Game/FactoryGame/Prototype/Buildable/Beams/Recipe_Beam.Recipe_Beam_C'
            },
            CONNECTOR: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Connector.Build_Beam_Connector_C',
                CLASS_NAME: 'Build_Beam_Connector_C'
            },
            CONNECTOR_DOUBLE: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Connector_Double.Build_Beam_Connector_Double_C',
                CLASS_NAME: 'Build_Beam_Connector_Double_C'
            },
            SUPPORT: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Support.Build_Beam_Support_C',
                CLASS_NAME: 'Build_Beam_Support_C'
            },
            CABLE: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Cable.Build_Beam_Cable_C',
                CLASS_NAME: 'Build_Beam_Cable_C',
                RECIPE: '/Game/FactoryGame/Prototype/Buildable/Beams/Recipe_Beam_Cable.Recipe_Beam_Cable_C'
            },
            CABLE_CLUSTER: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Cable_Cluster.Build_Beam_Cable_Cluster_C',
                CLASS_NAME: 'Build_Beam_Cable_Cluster_C'
            },
            CONCRETE: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Concrete.Build_Beam_Concrete_C',
                CLASS_NAME: 'Build_Beam_Concrete_C'
            },
            SHELF: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_Shelf.Build_Beam_Shelf_C',
                CLASS_NAME: 'Build_Beam_Shelf_C'
            },
            H: {
                TYPE_PATH: '/Game/FactoryGame/Prototype/Buildable/Beams/Build_Beam_H.Build_Beam_H_C',
                CLASS_NAME: 'Build_Beam_H_C'
            },
            BUILDABLE_BEAM_LIGHTWEIGHT_DATA: {
                TYPE_PATH: '/Script/FactoryGame.BuildableBeamLightweightData'
            }
        },
        POWER_POLE: {
            POWER_POLE_MK1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerPoleMk1/Build_PowerPoleMk1.Build_PowerPoleMk1_C',
                CLASS_NAME: 'Build_PowerPoleMk1_C',
            },
            POWER_POLE_MK2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerPoleMk2/Build_PowerPoleMk2.Build_PowerPoleMk2_C',
                CLASS_NAME: 'Build_PowerPoleMk2_C'
            },
            POWER_POLE_MK3: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerPoleMk3/Build_PowerPoleMk3.Build_PowerPoleMk3_C',
                CLASS_NAME: 'Build_PowerPoleMk3_C'
            },
            POWER_POLE_WALL_MK1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerPoleWall/Build_PowerPoleWall.Build_PowerPoleWall_C',
                CLASS_NAME: 'Build_PowerPoleWall_C'
            },
            POWER_POLE_WALL_MK2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerPoleWall/Build_PowerPoleWall_Mk2.Build_PowerPoleWall_Mk2_C',
                CLASS_NAME: 'Build_PowerPoleWall_Mk2_C'
            },
        },
        POWER_LINE: {
            POWER_LINE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerLine/Build_PowerLine.Build_PowerLine_C',
                CLASS_NAME: 'Build_PowerLine_C'
            },
            POWER_LINE_XMAS: {
                TYPE_PATH: '/Game/FactoryGame/Events/Christmas/Buildings/PowerLineLights/Build_XmassLightsLine.Build_XmassLightsLine_C',
                CLASS_NAME: 'Build_XmassLightsLine_C'
            }
        },
        CHRISTMAS_TREE: {
            TYPE_PATH: '/Game/FactoryGame/Events/Christmas/Buildings/TreeDecor/Build_XmassTree.Build_XmassTree_C'
        },
        TRAIN: {
            TRAIN_STATION_IDENTIFIER: {
                TYPE_PATH: '/Script/FactoryGame.FGTrainStationIdentifier'
            },
            TRAIN_STATION: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/Station/Build_TrainStation.Build_TrainStation_C'
            }
        },
        RAILROAD: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/Track/Build_RailroadTrack.Build_RailroadTrack_C',
            CLASS_NAME: 'Build_RailroadTrack_C',
            RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_RailroadTrack.Recipe_RailroadTrack_C'
        },
        RAILROAD_STOP: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/EndStop/Build_RailroadEndStop.Build_RailroadEndStop_C',
            CLASS_NAME: 'Build_RailroadEndStop_C'
        },
        HUB_TERMINAL: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/HubTerminal/Build_HubTerminal.Build_HubTerminal_C',
            CLASS_NAME: 'Build_HubTerminal_C'
        },
        HUB_TRADEPOST: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/TradingPost/Build_TradingPost.Build_TradingPost_C',
            CLASS_NAME: 'Build_TradingPost_C'
        },
        LOOKOUT_TOWER: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/LookoutTower/Build_LookoutTower.Build_LookoutTower_C',
            CLASS_NAME: 'Build_LookoutTower_C'
        },
        RAILROAD_SIGNALS: {
            BLOCK_SIGNAL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/Signal/Build_RailroadBlockSignal.Build_RailroadBlockSignal_C'
            },
            PATH_SIGNAL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/Signal/Build_RailroadPathSignal.Build_RailroadPathSignal_C'
            },
        },
        RAILROAD_INTEGRATED: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Train/Track/Build_RailroadTrackIntegrated.Build_RailroadTrackIntegrated_C',
            CLASS_NAME: 'Build_RailroadTrackIntegrated_C'
        },
        DRONE: {
            DRONE_STATION_INFO: {
                TYPE_PATH: '/Script/FactoryGame.FGDroneStationInfo'
            },
            DRONE_STATION: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/DroneStation/Build_DroneStation.Build_DroneStation_C'
            },
            DRONE_TRANSPORT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/DroneStation/BP_DroneTransport.BP_DroneTransport_C'
            },
        },
        DROP_POD: {
            TYPE_PATH: '/Game/FactoryGame/World/Benefit/DropPod/BP_DropPod.BP_DropPod_C',
            CLASS_NAME: 'BP_DropPod_C'
        },
        VEHICLE: {
            DRIVING_TARGET_LIST: {
                TYPE_PATH: '/Script/FactoryGame.FGDrivingTargetList'
            },
            CYBER_WAGON: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Cyberwagon/Testa_BP_WB.Testa_BP_WB_C',
                CLASS_NAME: 'Testa_BP_WB_C'
            },
            FACTORY_CART: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Golfcart/BP_Golfcart.BP_Golfcart_C',
                CLASS_NAME: 'BP_Golfcart_C'
            },
            FACTORY_CART_GOLD: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Golfcart/BP_GolfcartGold.BP_GolfcartGold_C',
                CLASS_NAME: 'BP_GolfcartGold_C'
            },
            EXPLORER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Explorer/BP_Explorer.BP_Explorer_C',
                CLASS_NAME: 'BP_Explorer_C'
            },
            TRUCK: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Truck/BP_Truck.BP_Truck_C',
                CLASS_NAME: 'BP_Truck_C'
            },
            TRACTOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Tractor/BP_Tractor.BP_Tractor_C',
                CLASS_NAME: 'BP_Tractor_C'
            },
            TRAIN: {
                LOCOMOTIVE: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Train/Locomotive/BP_Locomotive.BP_Locomotive_C',
                },
                FREIGHT_WAGON: {
                    TYPE_PATH: '/Game/FactoryGame/Buildable/Vehicle/Train/Wagon/BP_FreightWagon.BP_FreightWagon_C'
                }
            }
        },
        VENT: {
            LARGE_FAN: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Vent/Build_LargeFan.Build_LargeFan_C',
                CLASS_NAME: 'Build_LargeFan_C'
            },
            LARGE_VENT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Vent/Build_LargeVent.Build_LargeVent_C',
                CLASS_NAME: 'Build_LargeVent_C'
            }
        },
        CONVEYOR: {
            BELT_REGEX: /^\/Game\/FactoryGame\/Buildable\/Factory\/(ConveyorBeltMk[0-9]+)\/Build_(\1)\.Build_(\1)_C$/,
            LIFT_REGEX: /^\/Game\/FactoryGame\/Buildable\/Factory\/(ConveyorLiftMk[0-9]+)\/Build_(\1)\.Build_(\1)_C$/,
            BELT_MK1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk1/Build_ConveyorBeltMk1.Build_ConveyorBeltMk1_C',
                CLASS_NAME: 'Build_ConveyorBeltMk1_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_ConveyorBeltMk1.Recipe_ConveyorBeltMk1_C',
            },
            BELT_MK2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk2/Build_ConveyorBeltMk2.Build_ConveyorBeltMk2_C',
                CLASS_NAME: 'Build_ConveyorBeltMk2_C'
            },
            BELT_MK3: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk3/Build_ConveyorBeltMk3.Build_ConveyorBeltMk3_C',
                CLASS_NAME: 'Build_ConveyorBeltMk3_C'
            },
            BELT_MK4: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk4/Build_ConveyorBeltMk4.Build_ConveyorBeltMk4_C',
                CLASS_NAME: 'Build_ConveyorBeltMk4_C'
            },
            BELT_MK5: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk5/Build_ConveyorBeltMk5.Build_ConveyorBeltMk5_C',
                CLASS_NAME: 'Build_ConveyorBeltMk5_C'
            },
            BELT_MK6: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorBeltMk6/Build_ConveyorBeltMk6.Build_ConveyorBeltMk6_C',
                CLASS_NAME: 'Build_ConveyorBeltMk6_C'
            },
            LIFT_MK1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk1/Build_ConveyorLiftMk1.Build_ConveyorLiftMk1_C',
                CLASS_NAME: 'Build_ConveyorLiftMk1_C'
            },
            LIFT_MK2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk2/Build_ConveyorLiftMk2.Build_ConveyorLiftMk2_C',
                CLASS_NAME: 'Build_ConveyorLiftMk2_C'
            },
            LIFT_MK3: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk3/Build_ConveyorLiftMk3.Build_ConveyorLiftMk3_C',
                CLASS_NAME: 'Build_ConveyorLiftMk3_C'
            },
            LIFT_MK4: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk4/Build_ConveyorLiftMk4.Build_ConveyorLiftMk4_C',
                CLASS_NAME: 'Build_ConveyorLiftMk4_C'
            },
            LIFT_MK5: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk5/Build_ConveyorLiftMk5.Build_ConveyorLiftMk5_C',
                CLASS_NAME: 'Build_ConveyorLiftMk5_C'
            },
            LIFT_MK6: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorLiftMk6/Build_ConveyorLiftMk6.Build_ConveyorLiftMk6_C',
                CLASS_NAME: 'Build_ConveyorLiftMk6_C'
            },
            MONITOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConveyorMonitor/Build_ConveyorMonitor.Build_ConveyorMonitor_C',
                CLASS_NAME: 'Build_ConveyorMonitor_C'
            },
            PRIORITY_MERGER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/CA_MergerPriority/Build_ConveyorAttachmentMergerPriority.Build_ConveyorAttachmentMergerPriority_C',
                CLASS_NAME: 'Build_ConveyorAttachmentMergerPriority_C'
            }
        },
        PIPELINE: {
            PIPELINE_MK1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Pipeline/Build_Pipeline.Build_Pipeline_C'
            },
            PIPELINE_MK2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipelineMk2/Build_PipelineMK2.Build_PipelineMK2_C'
            },
            PIPELINE_NETWORK: {
                TYPE_PATH: '/Script/FactoryGame.FGPipeNetwork'
            }
        },
        RADAR_TOWER: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/RadarTower/Build_RadarTower.Build_RadarTower_C',
            CLASS_NAME: 'Build_RadarTower_C'
        },
        PROJECT_ASSEMBLY: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ProjectAssembly/BP_ProjectAssembly.BP_ProjectAssembly_C',
            CLASS_NAME: 'BP_ProjectAssembly_C'
        },
        SPACE_ELEVATOR: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SpaceElevator/Build_SpaceElevator.Build_SpaceElevator_C',
            CLASS_NAME: 'Build_SpaceElevator_C'
        },
        EXTRACTOR: {
            MINER_MK_1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/MinerMK1/Build_MinerMk1.Build_MinerMk1_C'
            },
            MINER_MK_2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/MinerMk2/Build_MinerMk2.Build_MinerMk2_C'
            },
            MINER_MK_3: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/MinerMk3/Build_MinerMk3.Build_MinerMk3_C'
            },
            WATER_EXTRACTOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/WaterPump/Build_WaterPump.Build_WaterPump_C'
            },
            OIL_EXTRACTOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/OilPump/Build_OilPump.Build_OilPump_C'
            },
            WELL_PRESSURIZER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/FrackingSmasher/Build_FrackingSmasher.Build_FrackingSmasher_C'
            },
            WELL_EXTRACTOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/FrackingExtractor/Build_FrackingExtractor.Build_FrackingExtractor_C'
            },
            GIFT_PRODUCER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Holiday/Build_TreeGiftProducer/Build_TreeGiftProducer.Build_TreeGiftProducer_C'
            },
        },
        SHELF: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/StackableShelf/Build_StackableShelf.Build_StackableShelf_C',
            CLASS_NAME: 'Build_StackableShelf_C'
        },
        FACTORY: {
            CONSTRUCTOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ConstructorMk1/Build_ConstructorMk1.Build_ConstructorMk1_C'
            },
            SMELTER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SmelterMk1/Build_SmelterMk1.Build_SmelterMk1_C'
            },
            REFINERY: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/OilRefinery/Build_OilRefinery.Build_OilRefinery_C'
            },
            BLENDER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Blender/Build_Blender.Build_Blender_C'
            },
            ASSEMBLER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/AssemblerMk1/Build_AssemblerMk1.Build_AssemblerMk1_C'
            },
            MANUFACTURER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/ManufacturerMk1/Build_ManufacturerMk1.Build_ManufacturerMk1_C'
            },
            FOUNDRY: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/FoundryMk1/Build_FoundryMk1.Build_FoundryMk1_C'
            },
            PACKAGER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Packager/Build_Packager.Build_Packager_C'
            },
            PARTICLE_ACCELERATOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/HadronCollider/Build_HadronCollider.Build_HadronCollider_C'
            },
            CONVERTER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Converter/Build_Converter.Build_Converter_C'
            },
            QUANTUM_ENCODER: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/QuantumEncoder/Build_QuantumEncoder.Build_QuantumEncoder_C',
                CLASS_NAME: 'Build_QuantumEncoder_C'
            },
        },
        POWER_GENERATORS: {
            COAL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/GeneratorCoal/Build_GeneratorCoal.Build_GeneratorCoal_C',
                CLASS_NAME: 'Build_GeneratorCoal_C'
            },
            FUEL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/GeneratorFuel/Build_GeneratorFuel.Build_GeneratorFuel_C',
                CLASS_NAME: 'Build_GeneratorFuel_C'
            },
            BIOMASS_AUTOMATED: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/GeneratorBiomass/Build_GeneratorBiomass_Automated.Build_GeneratorBiomass_Automated_C',
                CLASS_NAME: 'Build_GeneratorBiomass_Automated_C'
            },
            BIOMASS_INTEGRATED: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/GeneratorBiomass/Build_GeneratorIntegratedBiomass.Build_GeneratorIntegratedBiomass_C',
                CLASS_NAME: 'Build_GeneratorIntegratedBiomass_C'
            },
            POWER_STORAGE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PowerStorage/Build_PowerStorageMk1.Build_PowerStorageMk1_C',
                CLASS_NAME: 'Build_PowerStorageMk1_C'
            },
            NUCLEAR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/GeneratorNuclear/Build_GeneratorNuclear.Build_GeneratorNuclear_C',
                CLASS_NAME: 'Build_GeneratorNuclear_C'
            },
            ALIEN_POWER_BUILDING: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/AlienPower/Build_AlienPowerBuilding.Build_AlienPowerBuilding_C',
                CLASS_NAME: 'Build_AlienPowerBuilding_C'
            },
        },
        STORAGE: {
            CONTAINER_MK_1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StorageContainerMk1/Build_StorageContainerMk1.Build_StorageContainerMk1_C',
                CLASS_NAME: 'Build_StorageContainerMk1_C'
            },
            CONTAINER_MK_2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StorageContainerMk2/Build_StorageContainerMk2.Build_StorageContainerMk2_C',
                CLASS_NAME: 'Build_StorageContainerMk2_C'
            },
            CENTRAL_STORAGE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/CentralStorage/Build_CentralStorage.Build_CentralStorage_C',
                CLASS_NAME: 'Build_CentralStorage_C'
            },
            FLUID_BUFFER_MK_1: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StorageTank/Build_PipeStorageTank.Build_PipeStorageTank_C',
                CLASS_NAME: 'Build_PipeStorageTank_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_PipeStorageTank.Recipe_PipeStorageTank_C'
            },
            FLUID_BUFFER_MK_2: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/IndustrialFluidContainer/Build_IndustrialTank.Build_IndustrialTank_C',
                CLASS_NAME: 'Build_IndustrialTank_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_IndustrialTank.Recipe_IndustrialTank_C'
            },
            PLAYER_CRATE: {
                TYPE_PATH: '/Game/FactoryGame/-Shared/Crate/BP_Crate.BP_Crate_C',
                CLASS_NAME: 'BP_Crate_C'
            },
            PLAYER_STORAGE_CRATE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StoragePlayer/Build_StoragePlayer.Build_StoragePlayer_C',
                CLASS_NAME: 'Build_StoragePlayer_C'
            },
            STORAGE_CRATE_INTEGRATED: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StoragePlayer/Build_StorageIntegrated.Build_StorageIntegrated_C',
                CLASS_NAME: 'Build_StorageIntegrated_C'
            },
            PLAYER_HAZARD_CRATE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StoragePlayer/Build_StorageHazard.Build_StorageHazard_C',
                CLASS_NAME: 'Build_StorageHazard_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_StorageHazard.Recipe_StorageHazard_C'
            },
            PLAYER_MEDICAL_CRATE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/StoragePlayer/Build_StorageMedkit.Build_StorageMedkit_C',
                CLASS_NAME: 'Build_StorageMedkit_C'
            },
        },
        POTTY: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Building/Potty/BUILD_Potty_mk1.BUILD_Potty_mk1_C',
            CLASS_NAME: 'BUILD_Potty_mk1_C'
        },
        SIGN: {
            LARGE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Large.Build_StandaloneWidgetSign_Large_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Large_C'
            },
            HUGE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Huge.Build_StandaloneWidgetSign_Huge_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Huge_C'
            },
            SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Small.Build_StandaloneWidgetSign_Small_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Small_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_StandaloneWidgetSign_Small.Recipe_StandaloneWidgetSign_Small_C',
                PREFAB_LAYOUT: '/Game/FactoryGame/Interface/UI/InGame/Signs/SignLayouts/BPW_Sign4x1_1.BPW_Sign4x1_1_C'
            },
            SMALL_WIDE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_SmallWide.Build_StandaloneWidgetSign_SmallWide_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_SmallWide_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_StandaloneWidgetSign_SmallWide.Recipe_StandaloneWidgetSign_SmallWide_C',
                PREFAB_LAYOUT: '/Game/FactoryGame/Interface/UI/InGame/Signs/SignLayouts/BPW_Sign4x1_1.BPW_Sign4x1_1_C'
            },
            SMALL_VERY_WIDE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_SmallVeryWide.Build_StandaloneWidgetSign_SmallVeryWide_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_SmallVeryWide_C',
            },
            SQUARE_TINY: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Square_Tiny.Build_StandaloneWidgetSign_Square_Tiny_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Square_Tiny_C',
            },
            SQUARE_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Square_Small.Build_StandaloneWidgetSign_Square_Small_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Square_Small_C',
            },
            SQUARE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Square.Build_StandaloneWidgetSign_Square_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Square_C',
            },
            MEDIUM: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Medium.Build_StandaloneWidgetSign_Medium_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Medium_C',
            },
            PORTRAIT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/SignDigital/Build_StandaloneWidgetSign_Portrait.Build_StandaloneWidgetSign_Portrait_C',
                CLASS_NAME: 'Build_StandaloneWidgetSign_Portrait_C',
                RECIPE: '/Game/FactoryGame/Recipes/Buildings/Recipe_StandaloneWidgetSign_Portrait.Recipe_StandaloneWidgetSign_Portrait_C',
                PREFAB_LAYOUT: '/Game/FactoryGame/Interface/UI/InGame/Signs/SignLayouts/BPW_Sign2x3_0.BPW_Sign2x3_0_C'
            }
        },
        PLAYER: {
            TYPE_PATH: '/Game/FactoryGame/Character/Player/Char_Player.Char_Player_C',
            CLASS_NAME: 'Char_Player_C'
        },
        PLAYER_STATE: {
            TYPE_PATH: '/Game/FactoryGame/Character/Player/BP_PlayerState.BP_PlayerState_C'
        },
        PORTAL: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Portal/Build_Portal.Build_Portal_C',
            CLASS_NAME: 'Build_Portal_C'
        },
        PORTAL_SATELLITE: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Portal/Build_PortalSatellite.Build_PortalSatellite_C',
            CLASS_NAME: 'Build_PortalSatellite_C'
        },
        CREATURE: {
            ELITE_STINGER: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Stinger/BigStinger/Char_EliteStinger.Char_EliteStinger_C',
                CLASS_NAME: 'Char_EliteStinger_C'
            },
            STINGER: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Stinger/Char_Stinger.Char_Stinger_C',
                CLASS_NAME: 'Char_Stinger_C'
            },
            CHILD_STINGER: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Stinger/SmallStinger/Char_Stinger_Child.Char_Stinger_Child',
                CLASS_NAME: 'Char_Stinger_Child'
            },
            CRAB_HATCHER: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/CrabHatcher/Char_CrabHatcher.Char_CrabHatcher_C',
                CLASS_NAME: 'Char_CrabHatcher_C'
            },
            BIG_CRAB_HATCHER: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/CrabHatcher/Char_BigCrabHatcher.Char_BigCrabHatcher_C',
                CLASS_NAME: 'Char_BigCrabHatcher_C'
            },
            FLYING_BABY_CRAB: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Crab/BabyCrab/BP_FlyingBabyCrab.BP_FlyingBabyCrab_C',
                CLASS_NAME: 'BP_FlyingBabyCrab_C'
            },
            HOG: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Hog/Char_Hog.Char_Hog_C',
                CLASS_NAME: 'Char_Hog_C'
            },
            ALPHA_HOG: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Hog/AlphaHog/Char_AlphaHog.Char_AlphaHog_C',
                CLASS_NAME: 'Char_AlphaHog_C'
            },
            CLIFF_HOG: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Hog/CliffHog/Char_CliffHog.Char_CliffHog_C',
                CLASS_NAME: 'Char_CliffHog_C'
            },
            NUCLEAR_HOG: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Hog/NuclearHog/Char_NuclearHog.Char_NuclearHog_C',
                CLASS_NAME: 'Char_NuclearHog_C'
            },
            JOHNNY_HOG: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Hog/Johnny/Char_Johnny.Char_Johnny_C',
                CLASS_NAME: 'Char_Johnny_C'
            },
            SPITTER_ALPHA: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/AlternativeSpitter/Char_Spitter_Alternative.Char_Spitter_Alternative_C',
                CLASS_NAME: 'Char_Spitter_Alternative_C'
            },
            SPITTER_DESERT_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterDesert/Char_SpitterDesertSmall.Char_SpitterDesertSmall_C',
                CLASS_NAME: 'Char_SpitterDesertSmall_C'
            },
            SPITTER_DESERT_ALPHA: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterDesert/Char_SpitterDesertAlpha.Char_SpitterDesertAlpha_C',
                CLASS_NAME: 'Char_SpitterDesertAlpha_C'
            },
            SPITTER_FOREST_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterForest/Char_SpitterForestSmall.Char_SpitterForestSmall_C',
                CLASS_NAME: 'Char_SpitterForestSmall_C'
            },
            SPITTER_FOREST_ALPHA: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterForest/Char_SpitterForestAlpha.Char_SpitterForestAlpha_C',
                CLASS_NAME: 'Char_SpitterForestAlpha_C'
            },
            SPITTER_RED_FOREST_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterForestRed/Char_SpitterForestRedSmall.Char_SpitterForestRedSmall_C',
                CLASS_NAME: 'Char_SpitterForestRedSmall_C'
            },
            SPITTER_RED_FOREST_ALPHA: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterForestRed/Char_SpitterForestRedAlpha.Char_SpitterForestRedAlpha_C',
                CLASS_NAME: 'Char_SpitterForestRedAlpha_C'
            },
            SPITTER_AQUATIC_SMALL: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterAquatic/Char_SpitterAquaticSmall.Char_SpitterAquaticSmall_C',
                CLASS_NAME: 'Char_SpitterAquaticSmall_C'
            },
            SPITTER_AQUATIC_ALPHA: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Enemy/Spitter/SpitterAquatic/Char_SpitterAquaticAlpha.Char_SpitterAquaticAlpha_C',
                CLASS_NAME: 'Char_SpitterAquaticAlpha_C'
            }
        },
        ANIMAL: {
            LIZARD_DOGGO: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Wildlife/SpaceRabbit/Char_SpaceRabbit.Char_SpaceRabbit_C',
                CLASS_NAME: 'Char_SpaceRabbit_C'
            },
            BEETLE: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Wildlife/Beetle/Char_Beetle.Char_Beetle_C',
                CLASS_NAME: 'Char_Beetle_C'
            },
            SPACE_GIRAFFE: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Wildlife/SpaceGiraffe/Char_SpaceGiraffe.Char_SpaceGiraffe_C',
                CLASS_NAME: 'Char_SpaceGiraffe_C'
            },
            BIRD: {
                TYPE_PATH: '/Game/FactoryGame/Character/Creature/Wildlife/NonFlyingBird/Char_NonFlyingBird.Char_NonFlyingBird_C',
                CLASS_NAME: 'Char_NonFlyingBird_C'
            }
        },
        BUILDGUN_BP: {
            TYPE_PATH: '/Game/FactoryGame/Equipment/BuildGun/BP_BuildGun.BP_BuildGun_C',
            CLASS_NAME: 'BP_BuildGun_C'
        },
        BUILDGUN: {
            TYPE_PATH: '/Script/FactoryGame.FGBuildGun'
        },
        ELEVATOR: {
            ELEVATOR_CABIN: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Elevator/BP_ElevatorCabin.BP_ElevatorCabin_C',
                CLASS_NAME: 'BP_ElevatorCabin_C'
            },
            STOP: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Elevator/Build_ElevatorFloorStop.Build_ElevatorFloorStop_C',
                CLASS_NAME: 'Build_ElevatorFloorStop_C'
            },
            ELEVATOR: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/Elevator/Build_Elevator.Build_Elevator_C',
                CLASS_NAME: 'Build_Elevator_C'
            }
        },
        HYPERTUBES: {
            HYPERTUBE_SUPPORT: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipeHyperSupport/Build_PipeHyperSupport.Build_PipeHyperSupport_C',
                CLASS_NAME: 'Build_PipeHyperSupport_C'
            },
            HYPERTUBE_ENTRANCE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipeHyperStart/Build_PipeHyperStart.Build_PipeHyperStart_C',
                CLASS_NAME: 'Build_PipeHyperStart_C',
                RECIPE: '/Game/FactoryGame/Recipe_PipeHyperStart.Recipe_PipeHyperStart_C'
            },
            HYPERTUBE: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipeHyper/Build_PipeHyper.Build_PipeHyper_C',
                CLASS_NAME: 'Build_PipeHyper_C'
            },
            TJUNCTION: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipeHyperTJunction/Build_HypertubeTJunction.Build_HypertubeTJunction_C',
                CLASS_NAME: 'Build_HypertubeTJunction_C'
            },
            JUNCTION: {
                TYPE_PATH: '/Game/FactoryGame/Buildable/Factory/PipeHyperJunction/Build_HyperTubeJunction.Build_HyperTubeJunction_C',
                CLASS_NAME: 'Build_HyperTubeJunction_C'
            }
        },
        SUBSYSTEMS_AND_MANAGERS: {
            WORLD_SETTINGS: {
                TYPE_PATH: '/Script/FactoryGame.FGWorldSettings',
            },
            LIGHTWEIGHT_BUILDABLE_SUBSYSTEM: {
                TYPE_PATH: '/Script/FactoryGame.FGLightweightBuildableSubsystem'
            },
            BUILDABLE_SUBSYSTEM: {
                TYPE_PATH: '/Game/FactoryGame/-Shared/Blueprint/BP_BuildableSubsystem.BP_BuildableSubsystem_C'
            },
            FOLIAGE_REMOVAL_SUBSYSTEM: {
                TYPE_PATH: '/Script/FactoryGame.FGFoliageRemovalSubsystem'
            },
            MAP_MANAGER: {
                TYPE_PATH: '/Script/FactoryGame.FGMapManager'
            },
            RECIPE_MANAGER: {
                INSTANCE_NAME: 'Persistent_Level:PersistentLevel.recipeManager',
                TYPE_PATH: '/Script/FactoryGame.FGRecipeManager',
            },
            UNLOCK_SUBSYSTEM: {
                INSTANCE_NAME: 'Persistent_Level:PersistentLevel.unlockSubsystem',
                TYPE_PATH: '/Game/FactoryGame/Unlocks/BP_UnlockSubsystem.BP_UnlockSubsystem_C',
            },
            RESEARCH_MANAGER: {
                INSTANCE_NAME: 'Persistent_Level:PersistentLevel.ResearchManager',
                TYPE_PATH: '/Game/FactoryGame/Recipes/Research/BP_ResearchManager.BP_ResearchManager_C'
            },
            SCHEMATIC_MANAGER: {
                TYPE_PATH: '/Game/FactoryGame/Schematics/Progression/BP_SchematicManager.BP_SchematicManager_C',
            },
            STATISTICS_SUBSYSTEM: {
                TYPE_PATH: '/Script/FactoryGame.FGStatisticsSubsystem'
            },
            RESOURCE_SINK_SUBSYSTEM: {
                TYPE_PATH: '/Script/FactoryGame.FGResourceSinkSubsystem'
            },
            GAME_RULES_SUBSYSTEM: {
                TYPE_PATH: '/Script/FactoryGame.FGGameRulesSubsystem'
            }
        }
    },
    COMPONENTS: {
        HEALTH_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGHealthComponent'
        },
        INVENTORY_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGInventoryComponent'
        },
        POWER_CONNECTION_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGPowerConnectionComponent'
        },
        POWER_INFO_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGPowerInfoComponent'
        },
        POWER_CIRCUIT: {
            TYPE_PATH: '/Script/FactoryGame.FGPowerCircuit'
        },
        RAILWAY_CONNECTION_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGRailroadTrackConnectionComponent'
        },
        FACTORY_CONNECTION_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGFactoryConnectionComponent',
            ENUM_BASE: 'EFactoryConnectionDirection',
            ENUM_INPUT: 'EFactoryConnectionDirection' + '::FCD_INPUT',
            ENUM_OUTPUT: 'EFactoryConnectionDirection' + '::FCD_OUTPUT',
        },
        HYPERTUBE_CONNECTION_COMPONENT: {
            TYPE_PATH: '/Script/FactoryGame.FGPipeConnectionComponentHyper'
        },
        WORKBENCH_COMPONENT: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/-Shared/WorkBench/BP_WorkBenchComponent.BP_WorkBenchComponent_C'
        },
        AUTOMATED_WORKBENCH: {
            TYPE_PATH: '/Script/FactoryGame.FGBuildableAutomatedWorkBench'
        },
        WORKSHOP_COMPONENT: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/-Shared/WorkBench/BP_WorkshopComponent.BP_WorkshopComponent_C'
        }
    },
    PATTERNS: {
        FULL_FACTORY_ZONE: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/-Shared/Customization/Patterns/Zones/PatternDesc_ZoneFull.PatternDesc_ZoneFull_C'
        },
        ARROW_LEFT: {
            TYPE_PATH: '/Game/FactoryGame/Buildable/-Shared/Customization/Patterns/Arrows/PatternDesc_ArrowLeft.PatternDesc_ArrowLeft_C'
        },
        ARROW_STRAIGHT: {
            TYPE_PATH: "/Game/FactoryGame/Buildable/-Shared/Customization/Patterns/Arrows/PatternDesc_ArrowStraight.PatternDesc_ArrowStraight_C"
        },
        NO_ARROW_RIGHT: {
            TYPE_PATH: "/Game/FactoryGame/Buildable/-Shared/Customization/Patterns/Arrows/PatternDesc_NO_ArrowRight.PatternDesc_NO_ArrowRight_C"
        }
    },
    EMOTES: {
        CLAP: '/Game/FactoryGame/Emotes/Emote_Clap.Emote_Clap_C',
        BUILDGUN_SPIN: '/Game/FactoryGame/Emotes/Emote_BuildGunSpin.Emote_BuildGunSpin_C',
        FACEPALM: '/Game/FactoryGame/Emotes/Emote_FacePalm.Emote_FacePalm_C',
        ROCK: '/Game/FactoryGame/Emotes/Emote_Rock.Emote_Rock_C',
        PAPER: '/Game/FactoryGame/Emotes/Emote_Paper.Emote_Paper_C',
        SCISSORS: '/Game/FactoryGame/Emotes/Emote_Scissors.Emote_Scissors_C',
        POINT: '/Game/FactoryGame/Emotes/Emote_Point.Emote_Point_C',
        WAVE: '/Game/FactoryGame/Emotes/Emote_Wave.Emote_Wave_C',
        HEART: '/Game/FactoryGame/Emotes/Emote_Heart.Emote_Heart_C',
        FINGERGUNS: '/Game/FactoryGame/Emotes/Emote_Fingerguns.Emote_Fingerguns_C',
    },
    TAPES: {
        ABSOLUTE_FICSIT: {
            DISPLAY_NAME: 'Absolute Ficsit',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/AbsoluteFicsit/Tape_AbsoluteFicsit.Tape_AbsoluteFicsit_C',
        },
        WORST_OF_GOAT_SIMULATOR: {
            DISPLAY_NAME: 'Worst of Goat Simulator',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/Goat/Tape_WorstOfGoat.Tape_WorstOfGoat_C',
        },
        JOEL_SYNTHOLM: {
            DISPLAY_NAME: 'Joel Syntholm',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/JoelSyntholm/Tape_JoelSyntholm.Tape_JoelSyntholm_C',
        },
        LE_MICHAEL: {
            DISPLAY_NAME: 'Le Michael',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/LeMichael/Tape_LeMichael.Tape_LeMichael_C',
        },
        SANCTUM: {
            DISPLAY_NAME: 'Sanctum',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/Sanctum/Tape_Sanctum.Tape_Sanctum_C',
        },
        SANCTUM_2: {
            DISPLAY_NAME: 'Sanctum 2',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/Sanctum2/Tape_Sanctum2.Tape_Sanctum2_C',
        },
        SONGS_OF_CONQUEST: {
            DISPLAY_NAME: 'Songs of Conquest',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/SongsOfConquest/Tape_SongsOfConquest.Tape_SongsOfConquest_C',
        },
        DEEP_ROCK_GALACTIC: {
            DISPLAY_NAME: 'Deep Rock Galactic',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/DeepRockGalactic/Tape_DeepRockGalactic.Tape_DeepRockGalactic_C',
        },
        HUNTDOWN: {
            DISPLAY_NAME: 'Huntdown',
            PATH_NAME: '/Game/FactoryGame/Resource/Tape/Huntdown/Tape_Huntdown.Tape_Huntdown_C',
        }
    },
    SKINS: {
        FICSMAS_STANDARD: {
            DISPLAY_NAME: 'Ficsmas Standard',
            PATH_NAME: '/Game/FactoryGame/Buildable/-Shared/Customization/Skins/Recipe_SkinFicsmas_Default.Recipe_SkinFicsmas_Default_C'
        },
        FICSMAS_PREMIUM: {
            DISPLAY_NAME: 'Ficsmas Premium',
            PATH_NAME: '/Game/FactoryGame/Buildable/-Shared/Customization/Skins/Recipe_SkinFicsmas_Premium.Recipe_SkinFicsmas_Premium_C'
        },
    },
    AREAS: {
        GRASS_FIELDS: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_GrassFields_1.Area_GrassFields_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_GrassFields_2.Area_GrassFields_2_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_GrassFields_3.Area_GrassFields_3_C'
        ],
        EASTERN_DUNE_FOREST: [
            'FactoryGame/Content/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_EasternDuneForest_1.Area_EasternDuneForest_1_C'
        ],
        WESTERN_DUNE_FOREST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_WesternDuneForest_1.Area_WesternDuneForest_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_WesternDuneForest_2.Area_WesternDuneForest_2_C',
        ],
        NO_MANS_LAND: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_NoMansLand_1.Area_NoMansLand_1_C'
        ],
        CRATER: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_crater_1.Area_crater_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_crater_2.Area_crater_2_C'
        ],
        SAVANNA: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_Savanna_1.Area_Savanna_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_Savanna_2.Area_Savanna_2_C'
        ],
        RED_JUNGLE: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RedJungle_1.Area_RedJungle_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RedJungle_2.Area_RedJungle_2_C'
        ],
        ROcKY_DESERT: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RockyDesert_1.Area_RockyDesert_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RockyDesert_2.Area_RockyDesert_2_C'
        ],
        DUNE_DESERT: [
            'FactoryGame/Content/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_DuneDesert_1.Area_DuneDesert_1_C',
            'FactoryGame/Content/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_DuneDesert_2.Area_DuneDesert_2_C'
        ],
        NORTHERN_FOREST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_NorthernForest_1.Area_NorthernForest_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_NorthernForest_2.Area_NorthernForest_2_C'
        ],
        SOUTHERN_FOREST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_SouthernForest_1.Area_SouthernForest_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_SouthernForest_2.Area_SouthernForest_2_C'
        ],
        RED_BAMBOO: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RedBambooFields_1.Area_RedBambooFields_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_RedBambooFields_2.Area_RedBambooFields_2_C'
        ],
        TITAN_FOREST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_TitanForest_1.Area_TitanForest_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_TitanForest_2.Area_TitanForest_2_C'
        ],
        LAKE_FOREST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_LakeForest_1.Area_LakeForest_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_LakeForest_2.Area_LakeForest_2_C'
        ],
        DESERT_CANYON: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_DesertCanyons_1.Area_DesertCanyons_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_DesertCanyons_2.Area_DesertCanyons_2_C'
        ],
        MAZE_CANYONS: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_MazeCanyons_1.Area_MazeCanyons_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_MazeCanyons_2.Area_MazeCanyons_2_C'
        ],
        SPIRE_COAST: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_SpireCoast.Area_SpireCoast_C'
        ],
        SWAMP: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_Swamp_1.Area_Swamp_1_C',
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_Swamp_2.Area_Swamp_2_C'
        ],
        ABYSS_CLIFFS: [
            '/Game/FactoryGame/Interface/UI/Minimap/MapAreaPersistenLevel/Area_AbyssCliffs_1.Area_AbyssCliffs_1_C'
        ]
    }
};
//# sourceMappingURL=edit-constants.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryGameCustomVersion = void 0;
var FactoryGameCustomVersion;
(function (FactoryGameCustomVersion) {
    FactoryGameCustomVersion[FactoryGameCustomVersion["BeforeCustomVersionWasAdded"] = 0] = "BeforeCustomVersionWasAdded";
    FactoryGameCustomVersion[FactoryGameCustomVersion["ItemPickupGotInventoryStack"] = 1] = "ItemPickupGotInventoryStack";
    FactoryGameCustomVersion[FactoryGameCustomVersion["InventoryItemGotPersistantSeralization"] = 2] = "InventoryItemGotPersistantSeralization";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MovedPreviewDistanceToDescriptor"] = 3] = "MovedPreviewDistanceToDescriptor";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MovedPreviewDistanceToItemView"] = 4] = "MovedPreviewDistanceToItemView";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MovedBuildCategory"] = 5] = "MovedBuildCategory";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RenamedTechOnionRingIndexToTechTier"] = 6] = "RenamedTechOnionRingIndexToTechTier";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RemovedRandomizedSchematicCosts"] = 7] = "RemovedRandomizedSchematicCosts";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RenamedArmsAnimClass"] = 8] = "RenamedArmsAnimClass";
    FactoryGameCustomVersion[FactoryGameCustomVersion["ChangedItemViewFocus"] = 9] = "ChangedItemViewFocus";
    FactoryGameCustomVersion[FactoryGameCustomVersion["AddedLargeIcons"] = 10] = "AddedLargeIcons";
    FactoryGameCustomVersion[FactoryGameCustomVersion["CookResearchRecipes"] = 11] = "CookResearchRecipes";
    FactoryGameCustomVersion[FactoryGameCustomVersion["ChangedFuelClassesStorage"] = 12] = "ChangedFuelClassesStorage";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactoredUnlockSystem"] = 13] = "RefactoredUnlockSystem";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactoredSchematicCategoryType"] = 14] = "RefactoredSchematicCategoryType";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RenamedPostProcessMembersOfHeightFog"] = 15] = "RenamedPostProcessMembersOfHeightFog";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MisplacedVersion"] = 16] = "MisplacedVersion";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RenamedSchematicShipTravelTime"] = 17] = "RenamedSchematicShipTravelTime";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactorSchematicDependencies"] = 18] = "RefactorSchematicDependencies";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactorUnlockScannableResources"] = 19] = "RefactorUnlockScannableResources";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactorDialogueData"] = 20] = "RefactorDialogueData";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RefactorDescriptors"] = 21] = "RefactorDescriptors";
    FactoryGameCustomVersion[FactoryGameCustomVersion["CachedSaveActors"] = 22] = "CachedSaveActors";
    FactoryGameCustomVersion[FactoryGameCustomVersion["RemovedCachedSaveActors"] = 23] = "RemovedCachedSaveActors";
    FactoryGameCustomVersion[FactoryGameCustomVersion["ExponentialHeightFogAttributesRenamed"] = 24] = "ExponentialHeightFogAttributesRenamed";
    FactoryGameCustomVersion[FactoryGameCustomVersion["CyclicCurveDeprecated"] = 25] = "CyclicCurveDeprecated";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MigratedUserSettingsToManagerClass"] = 26] = "MigratedUserSettingsToManagerClass";
    FactoryGameCustomVersion[FactoryGameCustomVersion["AlwaysSerializeRailroadTrackPositions"] = 27] = "AlwaysSerializeRailroadTrackPositions";
    FactoryGameCustomVersion[FactoryGameCustomVersion["MisplacedVersion2"] = 28] = "MisplacedVersion2";
    FactoryGameCustomVersion[FactoryGameCustomVersion["VersionPlusOne"] = 29] = "VersionPlusOne";
    FactoryGameCustomVersion[FactoryGameCustomVersion["LatestVersion"] = 28] = "LatestVersion";
})(FactoryGameCustomVersion || (exports.FactoryGameCustomVersion = FactoryGameCustomVersion = {}));
;
//# sourceMappingURL=factory-game-custom-version.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=save.types.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTextArrayProperty = exports.isStructArrayPRoperty = exports.isStrArrayProperty = exports.isSoftObjectArrayProperty = exports.isInterfaceArrayProperty = exports.isObjectArrayProperty = exports.isIntArrayProperty = exports.isFloatArrayProperty = exports.isEnumArrayProperty = exports.isDoubleArrayProperty = exports.isByteArrayProperty = exports.isInt64ArrayProperty = exports.isBoolArrayProperty = void 0;
const ArrayProperty_1 = __r(52);
function createArrayPropertyGuardFor(typeName) {
    return (property) => {
        return ((0, ArrayProperty_1.isArrayProperty)(property) &&
            property.propertyTagType?.children[0]?.name === typeName);
    };
}
exports.isBoolArrayProperty = createArrayPropertyGuardFor('BoolProperty');
exports.isInt64ArrayProperty = createArrayPropertyGuardFor('Int64Property');
exports.isByteArrayProperty = createArrayPropertyGuardFor('ByteProperty');
exports.isDoubleArrayProperty = createArrayPropertyGuardFor('DoubleProperty');
exports.isEnumArrayProperty = createArrayPropertyGuardFor('EnumProperty');
exports.isFloatArrayProperty = createArrayPropertyGuardFor('FloatProperty');
exports.isIntArrayProperty = createArrayPropertyGuardFor('IntProperty');
exports.isObjectArrayProperty = createArrayPropertyGuardFor('ObjectProperty');
exports.isInterfaceArrayProperty = createArrayPropertyGuardFor('InterfaceProperty');
exports.isSoftObjectArrayProperty = createArrayPropertyGuardFor('SoftObjectProperty');
exports.isStrArrayProperty = createArrayPropertyGuardFor('StrProperty');
exports.isStructArrayPRoperty = createArrayPropertyGuardFor('StructProperty');
exports.isTextArrayProperty = createArrayPropertyGuardFor('TextProperty');
//# sourceMappingURL=ArrayPropertySpecificTypes.js.map
},function(module,exports,__r){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStructSetProperty = exports.isNameSetProperty = exports.isStrSetProperty = exports.isObjectSetProperty = exports.isIntSetProperty = exports.isUint32SetProperty = void 0;
const SetProperty_1 = __r(84);
function createSetPropertyGuardFor(typeName) {
    return (property) => {
        return ((0, SetProperty_1.isSetProperty)(property) &&
            property.propertyTagType?.children[0]?.name === typeName);
    };
}
exports.isUint32SetProperty = createSetPropertyGuardFor('Uint32Property');
exports.isIntSetProperty = createSetPropertyGuardFor('IntProperty');
exports.isObjectSetProperty = createSetPropertyGuardFor('ObjectProperty');
exports.isStrSetProperty = createSetPropertyGuardFor('StrProperty');
exports.isNameSetProperty = createSetPropertyGuardFor('NameProperty');
exports.isStructSetProperty = createSetPropertyGuardFor('StructProperty');
//# sourceMappingURL=SetPropertySpecificTypes.js.map
},function(module,exports,__r){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableStreamParser = void 0;
const hierarchical_version_context_1 = __r(2);
const parser_error_1 = __r(3);
const data_blob_1 = __r(114);
const level_to_destroyed_actors_map_1 = __r(108);
const object_references_list_1 = __r(78);
const satisfactory_save_1 = __r(115);
const satisfactory_save_header_1 = __r(116);
const save_custom_version_1 = __r(8);
const save_reader_1 = __r(119);
const toc_blob_1 = __r(42);
const ObjectReference_1 = __r(17);
const SaveBodyValidation_1 = __r(120);
const FSaveObjectVersionData_1 = __r(11);
const streamWeb = (() => {
    try {
        return globalThis;
    }
    catch {
        try {
            return globalThis;
        }
        catch {
            return {
                ReadableStream: globalThis.ReadableStream,
                QueuingStrategy: globalThis.QueuingStrategy,
                ReadableStreamDefaultController: globalThis.ReadableStreamDefaultController
            };
        }
    }
})();
const DEFAULT_BYTE_HIGHWATERMARK = 1024 * 1024 * 200;
const createStringLengthQueuingStrategy = (highWaterMark = DEFAULT_BYTE_HIGHWATERMARK / 4) => ({
    highWaterMark,
    size: (chunk) => {
        if (chunk === undefined) {
            return 0;
        }
        return chunk.length;
    }
});
class SimpleWaitForConsumerLock {
    constructor() {
        this.locked = false;
        this.unlockWasCalledInTheMeantime = false;
        this.executionFn = undefined;
    }
    lock(executionFn) {
        this.executionFn = executionFn;
        this.locked = true;
        if (this.unlockWasCalledInTheMeantime) {
            this.unlock();
        }
    }
    unlock() {
        this.locked = false;
        if (this.executionFn) {
            this.executionFn();
            this.executionFn = undefined;
        }
        else {
            this.unlockWasCalledInTheMeantime = true;
        }
    }
}
;
class ReadableStreamParser {
    static async ReadWriteLevels(write, reader, mapName, buildVersion) {
        const batchingSizeOfObjects = 1000;
        const thresholdOfWrittenObjectsUntilWaitingForConsumerAgain = 3 * batchingSizeOfObjects;
        const levelCount = reader.readInt32();
        reader.onProgressCallback(reader.getBufferProgress(), `reading pack of ${levelCount + 1} levels.`);
        let writtenTotalObjectsSinceConsumerSync = 0;
        let collectables = [];
        let destroyedActorsMap = {};
        for (let j = 0; j <= levelCount; j++) {
            let levelName = (j === levelCount) ? '' + mapName : reader.readString();
            const level = {
                name: levelName,
                objects: [],
                collectables: [],
                writesDestroyedActorsInTOCBlob: false
            };
            const isPersistentLevel = levelName === mapName;
            if (j % 500 === 0) {
                reader.onProgressCallback(reader.getBufferProgress(), `reading level [${(j + 1)}/${(levelCount + 1)}] ${levelName}`);
            }
            await write(`${j > 0 ? ', ' : ''}"${levelName}": {"name": "${levelName}",`, false);
            const tocBlobMarker = toc_blob_1.TOCBlob.SkipOver(reader);
            const dataBlobMarker = data_blob_1.DataBlob.SkipOver(reader);
            if (!isPersistentLevel) {
                if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializePerStreamableLevelTOCVersion) {
                    level.saveCustomVersion = reader.readInt32();
                    await write(`"saveCustomVersion": ${level.saveCustomVersion},`, false);
                }
            }
            if (isPersistentLevel) {
                const destroyedActorsMap = level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.read(reader);
                await write(`"destroyedActorsMap": ${JSON.stringify(destroyedActorsMap)},`, false);
            }
            else {
                level.collectables = object_references_list_1.ObjectReferencesList.ReadList(reader);
                if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
                    const shouldSerializePerObjectVersionData = reader.readInt32() >= 1;
                    if (shouldSerializePerObjectVersionData) {
                        level.objectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
                        await write(`"objectVersionData": ${JSON.stringify(level.objectVersionData)},`, false);
                    }
                }
            }
            await write(`"collectables": [${level.collectables.map(obj => JSON.stringify(obj)).join(', ')}],`, false);
            hierarchical_version_context_1.HierarchyVersion.SetOnLevel(reader.context.saveVersion, level.saveCustomVersion);
            hierarchical_version_context_1.HierarchyVersion.SetOnLevel(reader.context.packageFileVersionUE5, level.objectVersionData?.packageFileVersion.ue5Version);
            const endOfLevelPosition = reader.getBufferPosition();
            await write(`"objects": [`, false);
            reader.jumpTo(tocBlobMarker.position);
            let countObjectHeaders = reader.readInt32();
            let totalReadObjectsInLevel = 0;
            let writtenObjectsInLevel = 0;
            let afterHeadersOfBatch = reader.getBufferPosition();
            let afterObjectsOfBatch = -1;
            do {
                reader.jumpTo(afterHeadersOfBatch);
                const objectCountToRead = Math.min(countObjectHeaders - totalReadObjectsInLevel, batchingSizeOfObjects);
                const objects = toc_blob_1.TOCBlob.ReadNObjectHeaders(reader, objectCountToRead);
                afterHeadersOfBatch = reader.getBufferPosition();
                if (countObjectHeaders === totalReadObjectsInLevel + objects.length) {
                    let remainingSize = tocBlobMarker.length - (reader.getBufferPosition() - tocBlobMarker.position);
                    if (remainingSize > 0) {
                        if (isPersistentLevel) {
                            destroyedActorsMap = level_to_destroyed_actors_map_1.LevelToDestroyedActorsMap.read(reader);
                        }
                        else {
                            collectables = object_references_list_1.ObjectReferencesList.ReadList(reader);
                        }
                        level.writesDestroyedActorsInTOCBlob = true;
                    }
                }
                if (totalReadObjectsInLevel === 0) {
                    reader.jumpTo(dataBlobMarker.position);
                    const posBeforeContents = reader.getBufferPosition();
                    const countEntities = reader.readInt32();
                    afterObjectsOfBatch = reader.getBufferPosition();
                }
                else {
                    reader.jumpTo(afterObjectsOfBatch);
                }
                data_blob_1.DataBlob.ReadNObjectContents(reader, objectCountToRead, objects, 0);
                afterObjectsOfBatch = reader.getBufferPosition();
                totalReadObjectsInLevel += objectCountToRead;
                if (countObjectHeaders > 10000 && totalReadObjectsInLevel % 10000 === 0) {
                    reader.onProgressCallback(reader.getBufferProgress(), `read object count [${(totalReadObjectsInLevel + 1)}/${(countObjectHeaders + 1)}] in level ${levelName}`);
                }
                let shouldWait = false;
                if (writtenTotalObjectsSinceConsumerSync >= thresholdOfWrittenObjectsUntilWaitingForConsumerAgain) {
                    shouldWait = true;
                    writtenTotalObjectsSinceConsumerSync = 0;
                }
                await write(`${writtenObjectsInLevel > 0 ? ', ' : ''}${objects.filter(Boolean).map(obj => JSON.stringify(obj)).join(', ')}`, shouldWait);
                writtenTotalObjectsSinceConsumerSync += objectCountToRead;
                writtenObjectsInLevel += objectCountToRead;
            } while (totalReadObjectsInLevel < countObjectHeaders);
            await write('], ', false);
            await write(`"writesDestroyedActorsInTOCBlob": ${JSON.stringify(level.writesDestroyedActorsInTOCBlob)}`, false);
            reader.jumpTo(endOfLevelPosition);
            await write('}', false);
        }
    }
}
exports.ReadableStreamParser = ReadableStreamParser;
_a = ReadableStreamParser;
ReadableStreamParser.CreateReadableStreamForParsingSave = (onStart, onCancel, onPullRequest, highWaterMark = DEFAULT_BYTE_HIGHWATERMARK / 4) => {
    let ourController = null;
    const stream = new streamWeb.ReadableStream({
        start: (controller) => {
            ourController = controller;
            onStart(ourController);
        },
        pull: (controller) => {
            onPullRequest(ourController.desiredSize ?? 1);
        },
        cancel: (reason) => {
            console.warn('parsing stream was canceled!', reason);
            if (ourController !== null) {
                ourController.close();
            }
            onCancel(reason);
        }
    }, createStringLengthQueuingStrategy(highWaterMark));
    const finish = () => {
        if (ourController !== null) {
            ourController?.close();
        }
    };
    return { stream, controller: ourController, finish };
};
ReadableStreamParser.CreateReadableStreamFromSaveToJson = (name, bytes, options) => {
    const waitForConsumerLock = new SimpleWaitForConsumerLock();
    const waitForConsumer = async () => {
        return new Promise((resolve, reject) => {
            waitForConsumerLock.lock(resolve);
        });
    };
    const { stream, controller, finish } = _a.CreateReadableStreamForParsingSave((controller) => {
    }, (reason) => { }, (desiredSize) => {
        waitForConsumerLock.unlock();
    });
    const write = async (value, waitForConsumerToBeReady = true) => {
        if (waitForConsumerToBeReady) {
            await waitForConsumer();
        }
        controller.enqueue(value);
    };
    const startStreaming = async () => {
        const reader = new save_reader_1.SaveReader(bytes, options?.onProgress);
        const header = satisfactory_save_header_1.SatisfactorySaveHeader.Parse(reader);
        const save = new satisfactory_save_1.SatisfactorySave(name, header);
        const roughSaveVersion = save_reader_1.SaveReader.GetApproximateSaveVersion(header.saveVersion);
        if (roughSaveVersion === '<U6') {
            throw new parser_error_1.UnsupportedVersionError('Game Version < U6 is not supported in the parser. Please save the file in a newer game version.');
        }
        const inflateResult = reader.inflateChunks();
        save.compressionInfo = inflateResult.compressionInfo;
        if (options?.onDecompressedSaveBody !== undefined) {
            options.onDecompressedSaveBody(reader.getBuffer());
        }
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.UnrealEngine5) {
            reader.readInt32();
        }
        let saveObjectVersionData = save.objectVersionData;
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.SerializeDataPackageVersionAndCustomVersions) {
            saveObjectVersionData = FSaveObjectVersionData_1.FSaveObjectVersionData.read(reader);
            reader.context.packageFileVersionUE5 = hierarchical_version_context_1.HierarchyVersion.CreateOnHeader(saveObjectVersionData.packageFileVersion.ue5Version);
        }
        let saveBodyValidation = save.saveBodyValidation;
        if (reader.context.saveVersion.header >= save_custom_version_1.SaveCustomVersion.IntroducedWorldPartition) {
            saveBodyValidation = SaveBodyValidation_1.SaveBodyValidation.Parse(reader);
        }
        await _a.WriteHeaderAndFieldsBeforeLevel(write, name, inflateResult.compressionInfo, header, saveBodyValidation, saveObjectVersionData);
        await _a.ReadWriteLevels(write, reader, save.header.mapName, save.header.buildVersion);
        await write(`}`, false);
        if (reader.getBufferPosition() < reader.getBufferLength()) {
            const countUnresolvedWorldSaveData = reader.readInt32();
            if (countUnresolvedWorldSaveData) {
                save.unresolvedWorldSaveData = [];
                for (let i = 0; i < countUnresolvedWorldSaveData; i++) {
                    save.unresolvedWorldSaveData.push(ObjectReference_1.ObjectReference.read(reader));
                }
                await write(`, "unresolvedWorldSaveData": ${JSON.stringify(save.unresolvedWorldSaveData)} `, false);
            }
        }
        if (options?.onProgress !== undefined) {
            options.onProgress(1, 'finished parsing.');
        }
        await write(`}`, true);
        finish();
    };
    return { stream, startStreaming };
};
ReadableStreamParser.WriteHeaderAndFieldsBeforeLevel = async (write, name, compressionInfo, header, saveBodyValidation, saveObjectVersionData) => {
    const compressionInfoEntry = `"compressionInfo": ${JSON.stringify(compressionInfo)}`;
    const saveBodyValidationEntry = saveBodyValidation !== undefined ? `, "saveBodyValidation": ${JSON.stringify(saveBodyValidation)}` : '';
    const saveObjectVersionDataEntry = saveObjectVersionData !== undefined ? `, "objectVersionData": ${JSON.stringify(saveObjectVersionData)}` : '';
    return write(`{"header": ${JSON.stringify(header)}, "name": "${name}", ${compressionInfoEntry}${saveBodyValidationEntry}${saveObjectVersionDataEntry}, "levels": {`, false);
};
//# sourceMappingURL=readable-stream-parser.js.map
}],c={};function r(i){if(c[i])return c[i].exports;const o=c[i]={exports:{}};m[i](o,o.exports,r);return o.exports;}return r(0);})();