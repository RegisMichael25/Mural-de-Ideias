package com.regis.mural.ideias.mapper;

import com.regis.mural.ideias.controller.request.IdeaRequest;
import com.regis.mural.ideias.controller.response.IdeaResponse;
import com.regis.mural.ideias.model.Idea;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
/**
 * @author Regis Michael
 * @since 2025-09-17
 */

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface IdeaMapper {

    Idea toModel(IdeaRequest request);

    IdeaResponse toResponse(Idea model);

    List<IdeaResponse> toResponse(List<Idea> listModel);

    @Mapping(target = "id", ignore = true)
    void toModel(@MappingTarget Idea modelTarget, Idea modelSource);
}
