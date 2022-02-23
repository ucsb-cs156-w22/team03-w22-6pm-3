package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.documents.EQfeature;
import edu.ucsb.cs156.example.documents.EQlisting;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.nimbusds.oauth2.sdk.Response;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(description = "Earthquake info from USGS")
@RequestMapping("/api/earthquakes")
@RestController
@Slf4j
public class EarthquakesController extends ApiController {

    @Autowired
    EarthquakeQueryService earthquakeQueryService;

    @Autowired
    EarthquakesCollection earthquakesCollection;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "List all earthquakes")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<EQfeature> allPosts() {
        Iterable<EQfeature> features = earthquakesCollection.findAll();
        return features;
    }

    @ApiOperation(value = "Delete all earthquakes from the collection")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/purge")
    public void purgeEQFeatures() throws JsonProcessingException{
        earthquakesCollection.deleteAll();
    }

    @ApiOperation(value = "Retrieve earthquakes from MongoDB")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/retrieve")
    public List<EQfeature> postEarthquakle(
        @ApiParam("distance in km, e.g. 100") @RequestParam String distance,
        @ApiParam("minimum magnitude, e.g. 2.5") @RequestParam String minMag
    ) throws JsonProcessingException {
        log.info("getEarthquakes: distance={} minMag={}", distance, minMag);
        String result = earthquakeQueryService.getJSON(distance, minMag);

        EQlisting collection = mapper.readValue(result, EQlisting.class);
        List<EQfeature> features = collection.getFeatures();
        List<EQfeature> storedfeatures = earthquakesCollection.saveAll(features);
        return storedfeatures;
    }


}