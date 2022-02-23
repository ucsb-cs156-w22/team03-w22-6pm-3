package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.collections.StudentCollection;
import edu.ucsb.cs156.example.documents.EQfeature;
import edu.ucsb.cs156.example.documents.EQgeometry;
import edu.ucsb.cs156.example.documents.EQproperties;
import edu.ucsb.cs156.example.documents.EQmetadata;
import edu.ucsb.cs156.example.documents.EQlisting;
import edu.ucsb.cs156.example.documents.RedditPost;
import edu.ucsb.cs156.example.documents.RedditT3;
import edu.ucsb.cs156.example.documents.Student;
import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import lombok.With;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(value = EarthquakesController.class)
@Import(TestConfig.class)
public class EarthquakesControllerTests extends ControllerTestCase {

  @MockBean
  EarthquakesCollection earthquakesCollection;

  @MockBean
  EarthquakeQueryService earthquakeQueryService;

  @MockBean
  UserRepository userRepository;

   @WithMockUser(roles = { "USER" })
        @Test
        public void api_eqfeatures_all__user_logged_in__returns_a_eqfeature_that_exists() throws Exception {

            EQproperties properties = EQproperties.builder()
            .mag(6.5)
            .place("test")
            .time(0x4000000L)
            .updated(0x5000L)
            .tz(8)
            .url("test")
            .detail("test")
            .felt(1)
            .cdi(1.1)
            .mmi(1.1)
            .alert("test")
            .status("test")
            .tsunami(1)
            .sig(1)
            .net("test")
            .code("test")
            .ids("test")
            .sources("test")
            .types("test")
            .nst(1)
            .dmin(0.1)
            .rms(0.1)
            .gap(0.1)
            .magType("test")
            .type("test")
            .build();

            List<EQproperties> lep = new ArrayList<>();
            lep.add(properties);

            EQgeometry geometry = EQgeometry.builder()
            .type("Point")
            .coordinates(List.of(1.0,1.0,1.0))
            .build();

            List<EQgeometry> leg = new ArrayList<>();
            leg.add(geometry);

            EQfeature feature = EQfeature.builder()
            ._id("a")
            .type("test")
            .properties(properties)
            .geometry(geometry)
            .id("test")
            .build();

            List<EQfeature> lef = new ArrayList<>();
            lef.add(feature);

            when(earthquakesCollection.findAll()).thenReturn(lef);

                // act
            MvcResult response = mockMvc.perform(get("/api/earthquakes/all"))
                            .andExpect(status().isOk()).andReturn();

                // assert

            verify(earthquakesCollection, times(1)).findAll();
            String expectedJson = mapper.writeValueAsString(lef);
            String responseString = response.getResponse().getContentAsString();
            assertEquals(expectedJson, responseString);

        }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void api_purge_eqfeatures_is_void() throws Exception {
            mockMvc.perform(post("/api/earthquakes/purge").with(csrf())).andExpect(status().isOk()).andReturn();

            verify(earthquakesCollection, times(1)).deleteAll();
    }   

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void api_retrieve_eqfeatures_is_void() throws Exception {
            EQproperties properties = EQproperties.builder()
            .mag(6.5)
            .place("test")
            .time(0x4000000L)
            .updated(0x5000L)
            .tz(8)
            .url("test")
            .detail("test")
            .felt(1)
            .cdi(1.1)
            .mmi(1.1)
            .alert("test")
            .status("test")
            .tsunami(1)
            .sig(1)
            .net("test")
            .code("test")
            .ids("test")
            .sources("test")
            .types("test")
            .nst(1)
            .dmin(0.1)
            .rms(0.1)
            .gap(0.1)
            .magType("test")
            .type("test")
            .build();

            List<EQproperties> lep = new ArrayList<>();
            lep.add(properties);

            EQgeometry geometry = EQgeometry.builder()
            .type("Point")
            .coordinates(List.of(1.0,1.0,1.0))
            .build();

            List<EQgeometry> leg = new ArrayList<>();
            leg.add(geometry);

            EQfeature feature = EQfeature.builder()
            ._id("a")
            .type("test")
            .properties(properties)
            .geometry(geometry)
            .id("test")
            .build();

            List<EQfeature> lef = new ArrayList<>();
            lef.add(feature);

            EQmetadata md = EQmetadata.builder()
                // stub

            EQlisting el = EQlisting.builder()
                .type("EQlisting")
                .metadata(md)
                // stub

            mockMvc.perform(post("/api/earthquakes/retrieve").with(csrf())).andExpect(status().isOk()).andReturn();

            verify(earthquakesCollection, times(1)).saveAll(features);
            String expectedJson = mapper.writeValueAsString(lef);
            String responseString = response.getResponse().getContentAsString();
            assertEquals(expectedJson, responseString);
    }

}